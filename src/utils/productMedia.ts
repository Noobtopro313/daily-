import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { getApp } from 'firebase/app';

const storage = getStorage(getApp());

export async function uploadProductMedia(file: File, productId: string): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
  const mediaRef = ref(storage, `products/${productId}/${Date.now()}-${safeName}`);
  const snapshot = await uploadBytes(mediaRef, file, { contentType: file.type });
  return getDownloadURL(snapshot.ref);
}

export function isVideoUrl(url: string): boolean {
  return /\\.(mp4|webm|ogg|mov)(\\?|#|$)/i.test(url);
}
