'use client';

import type { User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase/config'; // Keep imports for restoration
// import { onAuthStateChanged } from 'firebase/auth'; // AUTH_DISABLED
// import { doc, getDoc } from 'firebase/firestore'; // AUTH_DISABLED
import type { UserProfile } from '@/services/user-service';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true); // Start as true

  useEffect(() => {
    // AUTH_DISABLED: Firebase auth state listener removed
    setCurrentUser(null);
    setUserProfile(null);
    setLoading(false); // Set loading to false as we are not waiting for auth state
    
    // const unsubscribe = onAuthStateChanged(auth, async (user) => {
    //   setCurrentUser(user);
    //   if (user) {
    //     try {
    //       const userDocRef = doc(db, "users", user.uid);
    //       const userDocSnap = await getDoc(userDocRef);
    //       if (userDocSnap.exists()) {
    //         setUserProfile(userDocSnap.data() as UserProfile);
    //       } else {
    //         setUserProfile(null); 
    //       }
    //     } catch (error) {
    //       console.error("Error fetching user profile:", error);
    //       setUserProfile(null);
    //     }
    //   } else {
    //     setUserProfile(null);
    //   }
    //   setLoading(false);
    // });

    // return () => unsubscribe(); // AUTH_DISABLED
  }, []);

  const logout = async () => {
    // AUTH_DISABLED: Actual sign out logic removed
    // await auth.signOut(); 
    setCurrentUser(null);
    setUserProfile(null);
    console.log("Logout called (auth disabled).");
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
