import { auth, db } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { User } from "../types";

//   Sign in with Google
export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;

    if (!firebaseUser.email) throw new Error("Email is not found");

    const newUser: User = {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || "No Name",
      email: firebaseUser.email,
      avatar: firebaseUser.photoURL || "",
      role:  firebaseUser.email !== 'baxodirxodjaevone@gmail.com' && 
             firebaseUser.email !== 'artearomainfo@gmail.com' ? "user" : "admin",
      likedEvents: [],
      likedProducts: [],
      createdAt : new Date().toISOString(),
    };

    await setDoc(doc(db, "users", firebaseUser.uid), newUser, { merge: true });

    return newUser;
  } catch (error) {
    console.error("Ошибка авторизации:", error);
    return null;
  }
};

//  Registration via Email/Password
export const signUpWithEmail = async (email: string, password: string, name: string): Promise<User | null> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const newUser: User = {
      id: firebaseUser.uid,
      name,
      email,
      avatar: "",
      role: "user",
      likedEvents: [],
      likedProducts: [],
    };

    await setDoc(doc(db, "users", firebaseUser.uid), newUser);

    return newUser;
  } catch (error) {
    console.error("Ошибка регистрации:", error);
    return null;
  }
};

//  Enter with Email/Password
export const loginWithEmail = async (email: string, password: string): Promise<User | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user as any; // Download user from Firestore в `AuthContext`
  } catch (error) {
    console.error("Ошибка входа:", error);
    return null;
  }
};

//  Выход
export const logout = async (): Promise<void> => {
  await signOut(auth);
};
