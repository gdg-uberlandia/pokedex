import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: window.ENV.FIREBASE_API_KEY,
  projectId: window.ENV.FIREBASE_PROJECT_ID,
  authDomain: window.ENV.FIREBASE_AUTH_DOMAIN,
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

export function signInWithGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}
