import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocFromServer,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore with custom database ID
const databaseId =
  firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
    ? firebaseConfig.firestoreDatabaseId
    : undefined;

export const db = databaseId ? getFirestore(app, databaseId) : getFirestore(app);

// Connection test as required by Firebase skill
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase Firestore connection verified.');
  } catch (error: any) {
    if (error?.message?.includes('the client is offline')) {
      console.warn('Firestore client is offline or network restricted.');
    }
  }
}
testConnection();

// Sign In with Google
export async function signInWithGoogle(): Promise<FirebaseUser | null> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Save/update user profile in Firestore
    if (user) {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          uid: user.uid,
          displayName: user.displayName || 'Customer',
          email: user.email,
          photoURL: user.photoURL || '',
          lastLogin: serverTimestamp(),
        },
        { merge: true }
      );
    }
    return user;
  } catch (error: any) {
    console.error('Google Sign-in error:', error);
    throw error;
  }
}

// Sign Out
export async function logOut(): Promise<void> {
  await signOut(auth);
}

// Save Order to Firestore
export async function saveOrderToFirestore(orderData: {
  orderId: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  items: any[];
  totalAmount: number;
  paymentMethod: string;
  status: string;
  coordinates?: { lat: number; lng: number };
}) {
  try {
    const orderRef = doc(db, 'orders', orderData.orderId);
    await setDoc(orderRef, {
      ...orderData,
      createdAt: new Date().toISOString(),
      timestamp: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('Error saving order to Firestore:', error);
    return false;
  }
}

// Fetch User Orders from Firestore
export async function fetchUserOrders(userId: string) {
  try {
    const q = query(collection(db, 'orders'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const orders: any[] = [];
    querySnapshot.forEach((d) => {
      orders.push(d.data());
    });
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

// Sync user's wishlist to Firestore
export async function syncWishlistToFirestore(userId: string, wishlistIds: string[]) {
  try {
    await setDoc(
      doc(db, 'users', userId),
      {
        wishlist: wishlistIds,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (err) {
    console.error('Error syncing wishlist to Firestore:', err);
  }
}

// Fetch wishlist from Firestore
export async function fetchWishlistFromFirestore(userId: string): Promise<string[] | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists() && userDoc.data()?.wishlist) {
      return userDoc.data().wishlist as string[];
    }
    return null;
  } catch (err) {
    console.error('Error fetching wishlist:', err);
    return null;
  }
}
