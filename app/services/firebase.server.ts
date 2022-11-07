import admin from "firebase-admin";
import {
    initializeApp as initializeAdminApp,
} from "firebase-admin/app";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signOut,
} from "firebase/auth";

// Para registrar o aplicativo no github
//https://github.com/settings/applications/new


// Your web app's Firebase configuration
const firebaseConfig = {
    // config goes here
};

if (!admin.apps.length) {
    initializeAdminApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY
                ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n")
                : undefined,
        })
    });
}

const db = admin.firestore();
const adminAuth = admin.auth();

/*let Firebase;

if (!Firebase?.apps?.length) {
    Firebase = initializeApp(firebaseConfig);
}*/

async function getSessionToken(idToken: string) {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    if (new Date().getTime() / 1000 - decodedToken.auth_time > 5 * 60) {
        throw new Error("Recent sign in required");
    }
    const twoWeeks = 60 * 60 * 24 * 14 * 1000;
    return adminAuth.createSessionCookie(idToken, { expiresIn: twoWeeks });
}

async function signOutFirebase() {
    await signOut(getAuth());
}

export { db, getSessionToken, signOutFirebase, adminAuth };