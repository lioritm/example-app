import { createContext, useContext, useEffect, useState } from "react";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { ContextProps } from "../interfaces/contexts";
import { AuthContextInterface } from "../interfaces/contexts";

const UserContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

export const AuthContextProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState<AuthContextInterface["user"]>(null);

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };
  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ user, logout, signIn, resetPassword, signUp }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
