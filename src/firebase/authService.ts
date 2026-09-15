import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser,
  type Auth
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from './config';

export interface AppUser {
  uid: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'joiner';
  zone: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Session key for persistent fallback in case Firebase Auth API is blocked or offline
const SESSION_STORAGE_KEY = 'farmerbox_auth_session';

export class AuthService {
  private authInstance: Auth | null = auth;
  private currentUser: AppUser | null = null;
  private authListeners: Array<(user: AppUser | null) => void> = [];

  constructor() {
    this.initAuth();
  }

  private initAuth() {
    // 1. Try restoring persistent session from storage immediately to prevent flicker on refresh
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

    // 2. Listen to live Firebase Auth state changes
    if (this.authInstance) {
      try {
        onAuthStateChanged(this.authInstance, async (fbUser: FirebaseUser | null) => {
          if (fbUser) {
            // Load user details from Firestore users collection
            const userProfile = await this.fetchUserProfile(fbUser.uid);
            if (userProfile) {
              this.currentUser = userProfile;
            } else if (this.currentUser && this.currentUser.uid === fbUser.uid) {
              // Keep existing memory profile if Firestore document isn't populated yet
            } else {
              // Create default profile for newly authenticated user
              const defaultUser: AppUser = {
                uid: fbUser.uid,
                name: fbUser.displayName || (fbUser.email ? fbUser.email.split('@')[0] : 'FarmerBox User'),
                email: fbUser.email || '',
                phone: fbUser.phoneNumber || '',
                role: (fbUser.email && fbUser.email.includes('admin')) ? 'admin' : 'joiner',
                zone: 'Kharadi Zone'
              };
              this.currentUser = defaultUser;
              await this.saveUserProfile(defaultUser);
            }
          } else if (!this.currentUser) {
            // No Firebase user and no manual session
            this.currentUser = null;
          }

          this.persistSession(this.currentUser);
          this.notifyListeners();
        });
      } catch (err) {
        console.warn('Firebase onAuthStateChanged setup error:', err);
      }
    }
  }

  public getCurrentUser(): AppUser | null {
    return this.currentUser;
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
      if (user) {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Error saving auth session:', e);
    }
  }

  public async fetchUserProfile(uid: string): Promise<AppUser | null> {
    if (!isFirebaseConfigured() || !db) return null;
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
    if (!isFirebaseConfigured() || !db) return;
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
   * Generates a deterministic UID from phone or email if Firebase Auth identity provider is not enabled in Firebase console
   */
  private generateDeterministicUid(identifier: string): string {
    const sanitized = identifier.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `usr_${sanitized}`;
  }

  /**
   * Login with Phone or Email
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

    // 1. Attempt live Firebase Auth signInWithEmailAndPassword if password provided
    if (this.authInstance && password) {
      try {
        const cred = await signInWithEmailAndPassword(this.authInstance, emailToUse, password);
        uid = cred.user.uid;
      } catch (authErr: any) {
        // If user not found, attempt to register automatically or fallback to anonymous auth
        if (authErr.code === 'auth/user-not-found' || authErr.code === 'auth/invalid-credential') {
          try {
            const newCred = await createUserWithEmailAndPassword(this.authInstance, emailToUse, password);
            uid = newCred.user.uid;
          } catch (createErr) {
            console.warn('Firebase Auth registration fallback:', createErr);
          }
        }
      }
    }

    // 2. If Firebase Auth returned no UID (e.g., config not enabled in console), derive deterministic UID
    if (!uid) {
      uid = this.generateDeterministicUid(cleanId);
    }

    // 3. Fetch or construct the user profile
    let profile = await this.fetchUserProfile(uid);
    if (!profile) {
      const isSuperAdmin = cleanId.toLowerCase().includes('admin') || role === 'admin';
      profile = {
        uid,
        name: isSuperAdmin ? 'Pushpak Wani (Admin)' : (cleanId === '9876543210' ? 'Rahul Patil' : `Joiner ${cleanId.slice(-4)}`),
        email: emailToUse,
        phone: isEmail ? '' : cleanId,
        role: isSuperAdmin ? 'admin' : 'joiner',
        zone: isSuperAdmin ? 'All Zones (HQ)' : 'Kharadi Zone',
        avatar: isSuperAdmin
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        createdAt: new Date().toISOString()
      };
      await this.saveUserProfile(profile);
    }

    this.currentUser = profile;
    this.persistSession(profile);
    this.notifyListeners();
    return profile;
  }

  /**
   * Register a new Joiner User
   */
  public async registerJoiner(data: {
    name: string;
    phone: string;
    email: string;
    zone: string;
    password?: string;
  }): Promise<AppUser> {
    const emailToUse = data.email ? data.email.trim() : `${data.phone}@farmerbox.in`;
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
      uid = this.generateDeterministicUid(data.phone || emailToUse);
    }

    const newUser: AppUser = {
      uid,
      name: data.name,
      phone: data.phone,
      email: emailToUse,
      zone: data.zone.includes('Zone') ? data.zone : `${data.zone} Zone`,
      role: 'joiner',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      createdAt: new Date().toISOString()
    };

    // Save directly to Firestore users collection
    await this.saveUserProfile(newUser);

    // Also register in Firestore joiners collection so Admin can see all Joiners!
    if (db) {
      try {
        await setDoc(doc(db, 'joiners', uid), {
          id: uid,
          name: data.name,
          mobile: data.phone,
          phone: data.phone,
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
   * Sign out and clear active session
   */
  public async logout(): Promise<void> {
    if (this.authInstance) {
      try {
        await signOut(this.authInstance);
      } catch (err) {
        console.warn('Firebase signOut error:', err);
      }
    }
    this.currentUser = null;
    this.persistSession(null);
    this.notifyListeners();
  }
}

export const authService = new AuthService();
