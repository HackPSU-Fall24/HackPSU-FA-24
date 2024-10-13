// src/lib/auth.ts
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUp = async (email: string, password: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
  
    // Save user data to Firestore
    await setDoc(doc(db, "Users", user.uid), {
      uid: user.uid,
      name,
      email,
      createdAt: new Date(),
      quiz_status: false
    });
  
    return user;
  };

export const signOut = () => {
  return firebaseSignOut(auth);
};
