
import { db } from "~/services/firebase.server"
import { COLLECTIONS } from "~/utils/collections";
import type { Award } from "./types";


export const getAwardById = async (id: string): Promise<Award> => {

    const docSnapshot = await db.collection(COLLECTIONS.AWARDS).doc(id).get();

    if (!docSnapshot.exists) {
        throw Error("No such document exists");
    } else {
        const profile: Award = {
            ...docSnapshot.data() as Award, id: docSnapshot.id,
        };
        return profile;
    }
}

export const consumeAward = async (id: string): Promise<Award> => {
    const docRef = db.collection(COLLECTIONS.AWARDS).doc(id);

    const award = await getAwardById(id);
    await docRef.update({ ...award, consumed: true });

    return getAwardById(id);
}