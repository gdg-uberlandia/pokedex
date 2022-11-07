import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "~/services/firebase.server"
import { COLLECTIONS } from "~/utils/collections";
import type { Profile } from "./types";

export const getAllProfiles = () => { }

//https://github.com/ianlenehan/my-remix-app/blob/master/app/post.js
export const getProfileByCode = async (code: string): Promise<Profile | null> => {
    try {

        console.log('inciia by code', code)
        const querySnapshot = await db.collection(COLLECTIONS.PROFILES).where("code", "==", code).get();

        const data: Array<Profile> = [];
        querySnapshot.forEach((doc: any) => {
            data.push({ ...doc.data(), id: doc.id })
        });

        if (data.length < 0)
            return null;

        console.log(data);

        return data[0];
    } catch (err) {
        console.error(err);
        return null;
    }
}