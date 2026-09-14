import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config';

/**
 * Upload an image (File or Blob) to Firebase Storage and return its public download URL.
 * Falls back safely if Storage is not configured or fails.
 */
export const uploadImageToStorage = async (
  file: File | Blob,
  folder: 'products' | 'hotels' | 'profiles' | 'drivers' = 'products',
  customFileName?: string
): Promise<string> => {
  if (!storage) {
    console.warn('Firebase Storage not initialized. Using local object URL fallback.');
    return URL.createObjectURL(file);
  }

  try {
    const filename = customFileName || `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.jpg`;
    const storageRef = ref(storage, `${folder}/${filename}`);
    
    // Upload bytes with proper contentType
    const metadata = {
      contentType: (file as File).type || 'image/jpeg'
    };

    const snapshot = await uploadBytes(storageRef, file, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Failed to upload image to Firebase Storage:', error);
    // Return object URL as temporary fallback
    return URL.createObjectURL(file);
  }
};
