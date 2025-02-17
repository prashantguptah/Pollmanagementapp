import { useNuxtApp } from "#app";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

export const useAuth = () => {
  const { $auth } = useNuxtApp();

  const login = async (email, password) => {
    return await signInWithEmailAndPassword($auth, email, password);
  };

  const register = async (email, password) => {
    return await createUserWithEmailAndPassword($auth, email, password);
  };

  const logout = async () => {
    return await signOut($auth);
  };

  return { login, register, logout };
};