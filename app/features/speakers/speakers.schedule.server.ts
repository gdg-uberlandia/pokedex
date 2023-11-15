import { COLLECTIONS } from "~/utils/collections";
import type { Speaker } from "./types";
import { db } from "~/services/firebase.server";

export const getSpeakers = async (): Promise<Array<Speaker>> => {
    const speakerQuerySnapshot = await db.collection(COLLECTIONS.SPEAKERS).get();
    const speaker:Array<Speaker>  = speakerQuerySnapshot.docs.map(doc => {return {...doc.data(), speakerSlug: doc.id} as Speaker});
    return speaker;
}