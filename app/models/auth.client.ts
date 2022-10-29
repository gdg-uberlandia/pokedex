import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxe__BU2qGJVd1C3HDGoLIwCs0Fmx4_0U",
  projectId: "pokedex-f279c",
  authDomain: "pokedex-f279c.firebaseapp.com",
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth(getApp());

export async function getIdToken() {
  return auth.currentUser?.getIdToken(true);
}

export function signInWithGitHub() {
  return signInWithPopup(auth, new GithubAuthProvider());
}
