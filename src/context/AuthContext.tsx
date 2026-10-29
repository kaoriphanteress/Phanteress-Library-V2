import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../services/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signingIn: boolean;
  authError: string | null;
  clearAuthError: () => void;
  signInWithGoogle: () => Promise<void>;
  signInAsGuest: (name?: string) => void;
  logout: () => Promise<void>;
}

const LOCAL_GUEST_USER_KEY = 'phanteress_guest_user_v1';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Check redirect login results on mount
  useEffect(() => {
    getRedirectResult(auth)
      .then((res) => {
        if (res?.user) {
          setUser(res.user);
        }
      })
      .catch((err) => {
        console.warn('Redirect auth result warning:', err);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          await setDoc(userDocRef, {
            uid: currentUser.uid,
            email: currentUser.email || '',
            displayName: currentUser.displayName || 'Showly User',
            photoURL: currentUser.photoURL || '',
            updatedAt: new Date().toISOString()
          }, { merge: true });
        } catch (err) {
          console.warn('Could not sync user profile to Firestore:', err);
        }
      } else {
        // Check if there is an existing local guest account
        try {
          const storedGuest = localStorage.getItem(LOCAL_GUEST_USER_KEY);
          if (storedGuest) {
            setUser(JSON.parse(storedGuest));
          } else {
            setUser(null);
          }
        } catch {
          setUser(null);
        }
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const clearAuthError = () => setAuthError(null);

  const signInWithGoogle = async () => {
    setAuthError(null);
    setSigningIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.warn('Google Popup Sign-in result:', error);
      if (error?.code === 'auth/popup-blocked' || error?.code === 'auth/cancelled-popup-request') {
        try {
          await signInWithRedirect(auth, googleProvider);
          return;
        } catch (redirectErr: any) {
          console.error('Redirect sign in error:', redirectErr);
          setAuthError(redirectErr?.message || 'Popup was blocked and redirect failed. Try guest profile.');
        }
      } else if (error?.code === 'auth/unauthorized-domain') {
        const domain = window.location.hostname;
        setAuthError(
          `Domain (${domain}) is not authorized in Firebase Console yet. Add it in Firebase Console > Authentication > Settings > Authorized domains. In the meantime, you can use Guest Profile sync!`
        );
      } else if (error?.code === 'auth/popup-closed-by-user') {
        // User voluntarily closed popup
      } else {
        setAuthError(error?.message || 'Google Sign In encountered an error.');
      }
    } finally {
      setSigningIn(false);
    }
  };

  const signInAsGuest = (name: string = 'Velvet Collector') => {
    const guestUser: any = {
      uid: `guest_${Date.now()}`,
      displayName: name,
      email: `${name.toLowerCase().replace(/\s+/g, '')}@velvetscreen.app`,
      photoURL: null,
      isAnonymous: true,
    };
    try {
      localStorage.setItem(LOCAL_GUEST_USER_KEY, JSON.stringify(guestUser));
    } catch {}
    setUser(guestUser);
    setAuthError(null);
  };

  const logout = async () => {
    try {
      localStorage.removeItem(LOCAL_GUEST_USER_KEY);
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Sign Out Error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signingIn,
        authError,
        clearAuthError,
        signInWithGoogle,
        signInAsGuest,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
