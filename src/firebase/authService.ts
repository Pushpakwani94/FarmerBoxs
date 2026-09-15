import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  type ConfirmationResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser,
  type Auth
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from './config';

export interface AppUser {
  uid: string;
  name: string;
  email: string;
  phone: string;
  phoneNumber?: string;
  role: 'admin' | 'joiner';
  zone: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

const SESSION_STORAGE_KEY = 'farmerbox_auth_session';

export class AuthService {
  private authInstance: Auth | null = auth;
  private currentUser: AppUser | null = null;
  private authListeners: Array<(user: AppUser | null) => void> = [];
  private confirmationResult: ConfirmationResult | null = null;
  private recaptchaVerifier: RecaptchaVerifier | null = null;

  constructor() {
    this.initAuth();
  }

  private initAuth() {
    // 1. Try restoring persistent session from storage to avoid flicker on page load
    if (typeof window !== 'undefined') {
      try {
        const storedSession = localStorage.getItem(SESSION_STORAGE_KEY);
        if (storedSession) {
          this.currentUser = JSON.parse(storedSession);
        }
      } catch (e) {
        console.warn('Could not read stored auth session:', e);
      }
    }

    // 2. Single source of truth: Firebase onAuthStateChanged
    if (this.authInstance) {
      try {
        onAuthStateChanged(this.authInstance, async (fbUser: FirebaseUser | null) => {
          if (fbUser) {
            // Fetch live user document from Firestore users/{uid}
            const userProfile = await this.fetchUserProfile(fbUser.uid);
            if (userProfile) {
              this.currentUser = userProfile;
            } else if (this.currentUser && this.currentUser.uid === fbUser.uid) {
              // Keep active profile in memory
            } else {
              const cleanPhone = (fbUser.phoneNumber || '').replace('+91', '').replace(/[^0-9]/g, '');
              const isSuperAdmin = (fbUser.email && fbUser.email.includes('admin')) || false;
              const defaultUser: AppUser = {
                uid: fbUser.uid,
                name: fbUser.displayName || (isSuperAdmin ? 'Super Admin' : (cleanPhone ? `Joiner ${cleanPhone.slice(-4)}` : 'FarmerBox Joiner')),
                email: fbUser.email || (cleanPhone ? `${cleanPhone}@farmerbox.in` : ''),
                phone: cleanPhone,
                phoneNumber: fbUser.phoneNumber || (cleanPhone ? `+91${cleanPhone}` : ''),
                role: isSuperAdmin ? 'admin' : 'joiner',
                zone: isSuperAdmin ? 'All Zones (HQ)' : 'Kharadi Zone',
                avatar: isSuperAdmin
                  ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300'
                  : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              };
              this.currentUser = defaultUser;
              await this.saveUserProfile(defaultUser);
            }
          } else {
            // User is signed out in Firebase Auth
            this.currentUser = null;
          }

          this.persistSession(this.currentUser);
          this.notifyListeners();
        });
      } catch (err) {
        console.warn('Firebase onAuthStateChanged setup notice:', err);
      }
    }
  }

  public getCurrentUser(): AppUser | null {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return Boolean(this.currentUser && this.currentUser.uid);
  }

  public onAuthChange(callback: (user: AppUser | null) => void): () => void {
    this.authListeners.push(callback);
    callback(this.currentUser);
    return () => {
      this.authListeners = this.authListeners.filter(cb => cb !== callback);
    };
  }

  private notifyListeners() {
    this.authListeners.forEach(cb => {
      try {
        cb(this.currentUser);
      } catch (e) {
        console.error('Auth listener error:', e);
      }
    });
  }

  private persistSession(user: AppUser | null) {
    if (typeof window === 'undefined') return;
    try {
      if (user && user.uid) {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Error persisting auth session:', e);
    }
  }

  public async fetchUserProfile(uid: string): Promise<AppUser | null> {
    if (!isFirebaseConfigured() || !db || !uid) return null;
    try {
      const userRef = doc(db, 'users', uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        return snap.data() as AppUser;
      }
    } catch (err) {
      console.warn('Could not fetch user profile from Firestore:', err);
    }
    return null;
  }

  public async saveUserProfile(user: AppUser): Promise<void> {
    if (!isFirebaseConfigured() || !db || !user.uid) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        ...user,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.warn('Could not save user profile to Firestore:', err);
    }
  }

  /**
   * Helper to validate Indian mobile numbers (+91XXXXXXXXXX)
   */
  public validateIndianPhoneNumber(phone: string): { isValid: boolean; formatted: string; clean: string; error?: string } {
    const clean = phone.replace(/[^0-9]/g, '');
    let nationalNumber = clean;

    if (clean.length === 12 && clean.startsWith('91')) {
      nationalNumber = clean.slice(2);
    } else if (clean.length === 11 && clean.startsWith('0')) {
      nationalNumber = clean.slice(1);
    }

    if (!nationalNumber || nationalNumber.length !== 10) {
      return { isValid: false, formatted: '', clean: nationalNumber, error: 'Please enter a valid 10-digit mobile number' };
    }

    if (!/^[6-9]\d{9}$/.test(nationalNumber)) {
      return { isValid: false, formatted: '', clean: nationalNumber, error: 'Mobile number must start with 6, 7, 8, or 9' };
    }

    return { isValid: true, formatted: `+91${nationalNumber}`, clean: nationalNumber };
  }

  /**
   * Correctly initialize and prevent multiple RecaptchaVerifier instances
   */
  private getOrCreateRecaptchaVerifier(containerId: string = 'recaptcha-container'): RecaptchaVerifier {
    if (!this.authInstance) {
      throw new Error('Firebase Authentication is not configured. Check VITE_FIREBASE_* environment variables.');
    }

    // Clean up previous instance and DOM element to prevent "reCAPTCHA already rendered" error
    if (this.recaptchaVerifier) {
      try {
        this.recaptchaVerifier.clear();
      } catch (e) {
        console.warn('Notice clearing recaptcha verifier:', e);
      }
      this.recaptchaVerifier = null;
    }

    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      container.style.position = 'fixed';
      container.style.bottom = '0';
      container.style.right = '0';
      container.style.zIndex = '9999';
      document.body.appendChild(container);
    } else {
      container.innerHTML = '';
    }

    this.recaptchaVerifier = new RecaptchaVerifier(this.authInstance, containerId, {
      size: 'invisible',
      callback: () => {
        console.log('Firebase reCAPTCHA verified');
      },
      'expired-callback': () => {
        console.warn('Firebase reCAPTCHA response expired');
      }
    });

    return this.recaptchaVerifier;
  }

  /**
   * Send real OTP using Firebase Phone Authentication
   */
  public async sendPhoneOtp(
    phone: string,
    containerId: string = 'recaptcha-container'
  ): Promise<{ success: boolean; message: string; formattedPhone: string }> {
    const validation = this.validateIndianPhoneNumber(phone);
    if (!validation.isValid) {
      throw new Error(validation.error || 'Invalid mobile number.');
    }

    if (!this.authInstance) {
      throw new Error('Firebase Auth is not initialized. Please verify configuration.');
    }

    try {
      const verifier = this.getOrCreateRecaptchaVerifier(containerId);
      const confirmation = await signInWithPhoneNumber(this.authInstance, validation.formatted, verifier);
      this.confirmationResult = confirmation;
      return {
        success: true,
        message: 'OTP sent successfully',
        formattedPhone: validation.formatted
      };
    } catch (err: any) {
      console.error('Firebase signInWithPhoneNumber error:', err);
      if (this.recaptchaVerifier) {
        try {
          this.recaptchaVerifier.clear();
        } catch (e) {
          // ignore
        }
        this.recaptchaVerifier = null;
      }
      throw new Error(this.mapAuthError(err));
    }
  }

  /**
   * Verify entered 6-digit OTP with Firebase
   */
  public async verifyPhoneOtp(
    otpCode: string,
    enteredPhone: string,
    optionalName?: string,
    optionalZone?: string
  ): Promise<AppUser> {
    const cleanOtp = (otpCode || '').replace(/[^0-9]/g, '');
    if (!cleanOtp || cleanOtp.length !== 6) {
      throw new Error('Please enter the valid 6-digit OTP code.');
    }

    if (!this.confirmationResult) {
      throw new Error('No active OTP verification session. Please request a new OTP.');
    }

    try {
      const userCredential = await this.confirmationResult.confirm(cleanOtp);
      const fbUser = userCredential.user;
      const cleanPhone = (fbUser.phoneNumber || enteredPhone).replace('+91', '').replace(/[^0-9]/g, '');

      // 1. Check users/{uid} in Firestore - DO NOT overwrite if already exists
      let profile = await this.fetchUserProfile(fbUser.uid);

      if (!profile) {
        // Create new joiner profile in Firestore ONLY if it does not exist
        profile = {
          uid: fbUser.uid,
          name: optionalName || `Joiner ${cleanPhone.slice(-4)}`,
          phone: cleanPhone,
          phoneNumber: fbUser.phoneNumber || `+91${cleanPhone}`,
          email: `${cleanPhone}@farmerbox.in`,
          role: 'joiner',
          zone: optionalZone ? (optionalZone.includes('Zone') ? optionalZone : `${optionalZone} Zone`) : 'Kharadi Zone',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        await this.saveUserProfile(profile);

        // Also register in joiners/{uid} collection for Admin dashboard visibility
        if (db) {
          try {
            await setDoc(doc(db, 'joiners', fbUser.uid), {
              id: fbUser.uid,
              name: profile.name,
              mobile: cleanPhone,
              phone: cleanPhone,
              email: profile.email,
              zone: profile.zone.replace(' Zone', ''),
              status: 'Active',
              joinerCode: `JN${fbUser.uid.slice(-4).toUpperCase()}`,
              totalHotels: 0,
              totalOrders: 0,
              totalEarnings: 0,
              commissionEarned: 0,
              joinedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
            }, { merge: true });
          } catch (e) {
            console.warn('Joiners doc creation notice:', e);
          }
        }
      }

      this.currentUser = profile;
      this.persistSession(profile);
      this.notifyListeners();
      return profile;
    } catch (err: any) {
      console.error('Firebase OTP verification error:', err);
      throw new Error(this.mapAuthError(err));
    }
  }

  /**
   * Resend OTP with cooldown support
   */
  public async resendPhoneOtp(
    phone: string,
    containerId: string = 'recaptcha-container'
  ): Promise<{ success: boolean; message: string }> {
    return this.sendPhoneOtp(phone, containerId);
  }

  /**
   * Sign In with Email/Password or Phone/Password (Admin / Fallback)
   */
  public async loginWithPhoneOrEmail(
    identifier: string,
    password?: string,
    role: 'admin' | 'joiner' = 'joiner'
  ): Promise<AppUser> {
    const cleanId = identifier.trim();
    const isEmail = cleanId.includes('@');
    const emailToUse = isEmail ? cleanId : `${cleanId}@farmerbox.in`;

    let uid: string | null = null;

    if (this.authInstance && password) {
      try {
        const cred = await signInWithEmailAndPassword(this.authInstance, emailToUse, password);
        uid = cred.user.uid;
      } catch (authErr: any) {
        if (authErr.code === 'auth/user-not-found' || authErr.code === 'auth/invalid-credential') {
          try {
            const newCred = await createUserWithEmailAndPassword(this.authInstance, emailToUse, password);
            uid = newCred.user.uid;
          } catch (createErr) {
            console.warn('Email create fallback notice:', createErr);
          }
        }
      }
    }

    if (!uid) {
      uid = `usr_${cleanId.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    }

    let profile = await this.fetchUserProfile(uid);
    if (!profile) {
      const isSuperAdmin = cleanId.toLowerCase().includes('admin') || role === 'admin';
      profile = {
        uid,
        name: isSuperAdmin ? 'Super Admin' : `Joiner ${cleanId.slice(-4)}`,
        email: emailToUse,
        phone: isEmail ? '' : cleanId,
        phoneNumber: isEmail ? '' : `+91${cleanId}`,
        role: isSuperAdmin ? 'admin' : 'joiner',
        zone: isSuperAdmin ? 'All Zones (HQ)' : 'Kharadi Zone',
        avatar: isSuperAdmin
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await this.saveUserProfile(profile);
    }

    this.currentUser = profile;
    this.persistSession(profile);
    this.notifyListeners();
    return profile;
  }

  /**
   * Register a new Joiner User with full profile details
   */
  public async registerJoiner(data: {
    name: string;
    phone: string;
    email: string;
    zone: string;
    password?: string;
  }): Promise<AppUser> {
    const validation = this.validateIndianPhoneNumber(data.phone);
    const cleanPhone = validation.isValid ? validation.clean : data.phone.replace(/[^0-9]/g, '');
    const emailToUse = data.email ? data.email.trim() : `${cleanPhone}@farmerbox.in`;

    let uid: string | null = null;

    if (this.authInstance && data.password) {
      try {
        const cred = await createUserWithEmailAndPassword(this.authInstance, emailToUse, data.password);
        uid = cred.user.uid;
      } catch (err: any) {
        console.warn('Firebase Auth create user note:', err?.message);
      }
    }

    if (!uid) {
      uid = `usr_${cleanPhone || emailToUse.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    }

    const newUser: AppUser = {
      uid,
      name: data.name,
      phone: cleanPhone,
      phoneNumber: `+91${cleanPhone}`,
      email: emailToUse,
      zone: data.zone.includes('Zone') ? data.zone : `${data.zone} Zone`,
      role: 'joiner',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await this.saveUserProfile(newUser);

    if (db) {
      try {
        await setDoc(doc(db, 'joiners', uid), {
          id: uid,
          name: data.name,
          mobile: cleanPhone,
          phone: cleanPhone,
          email: emailToUse,
          zone: newUser.zone.replace(' Zone', ''),
          status: 'Active',
          joinerCode: `JN${uid.slice(-4).toUpperCase()}`,
          totalHotels: 0,
          totalOrders: 0,
          totalEarnings: 0,
          commissionEarned: 0,
          joinedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        }, { merge: true });
      } catch (err) {
        console.warn('Failed to save joiner record in Firestore:', err);
      }
    }

    this.currentUser = newUser;
    this.persistSession(newUser);
    this.notifyListeners();
    return newUser;
  }

  /**
   * Super Admin Login
   */
  public async loginAdmin(email: string = 'admin@farmerbox.com', password?: string): Promise<AppUser> {
    return this.loginWithPhoneOrEmail(email, password, 'admin');
  }

  /**
   * Real Logout: signs out from Firebase Auth and clears all local session state
   */
  public async logout(): Promise<void> {
    if (this.authInstance) {
      try {
        await signOut(this.authInstance);
      } catch (err) {
        console.warn('Firebase signOut notice:', err);
      }
    }

    if (this.recaptchaVerifier) {
      try {
        this.recaptchaVerifier.clear();
      } catch (e) {
        // ignore
      }
      this.recaptchaVerifier = null;
    }

    this.confirmationResult = null;
    this.currentUser = null;
    this.persistSession(null);
    this.notifyListeners();
  }

  /**
   * Map Firebase Auth error codes to user-friendly human readable messages
   */
  private mapAuthError(err: any): string {
    const code = err?.code || '';
    const msg = err?.message || '';

    switch (code) {
      case 'auth/configuration-not-found':
        return 'Firebase Phone Authentication is not enabled in your Firebase Project console. To enable it: Go to Firebase Console -> Authentication -> Sign-in method tab -> Click "Phone" and toggle Enable -> Save. (You can also add test phone numbers under Phone provider like +919876543210 with OTP 123456).';
      case 'auth/invalid-phone-number':
        return 'Invalid phone number format. Please enter a 10-digit Indian mobile number.';
      case 'auth/missing-phone-number':
        return 'Phone number is required.';
      case 'auth/quota-exceeded':
        return 'SMS quota exceeded for today. Please try again later or use test phone credentials.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please wait a few moments before trying again.';
      case 'auth/invalid-verification-code':
        return 'Invalid 6-digit OTP code entered. Please check your SMS and enter the correct code.';
      case 'auth/code-expired':
        return 'The OTP verification code has expired. Please tap "Resend OTP Code" to get a new code.';
      case 'auth/missing-verification-code':
        return 'Please enter the 6-digit OTP code.';
      case 'auth/captcha-check-failed':
        return 'reCAPTCHA verification failed. Please try again.';
      case 'auth/network-request-failed':
        return 'Network connection error. Please check your internet connection.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact administrator.';
      case 'auth/operation-not-allowed':
        return 'Phone authentication is not enabled in Firebase Console. Please enable Phone provider under Firebase Console -> Authentication -> Sign-in method.';
      default:
        return msg || 'Authentication request failed. Please check your network and try again.';
    }
  }
}

export const authService = new AuthService();
