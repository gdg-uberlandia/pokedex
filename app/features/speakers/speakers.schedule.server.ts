import { COLLECTIONS } from "~/utils/collections";
import type { Speaker } from "./types";
import { db } from "~/services/firebase.server";

const getSpeakers = async (): Promise<Array<Speaker>> => {
  const speakerQuerySnapshot = await db.collection(COLLECTIONS.SPEAKERS).get();

  const speaker: Array<Speaker> = speakerQuerySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id } as Speaker;
  });

  return speaker;
};

const getSpeakerById = async (id?: string): Promise<Speaker> => {
  if (!id) {
    return {} as Speaker;
  }

  const speakerQuerySnapshot = await db
    .collection(COLLECTIONS.SPEAKERS)
    .doc(id)
    .get();

  if (!speakerQuerySnapshot.exists) {
    throw Error("No such document exists");
  }

  return {
    ...(speakerQuerySnapshot.data() as Speaker),
    id: speakerQuerySnapshot.id,
  };
};

export { getSpeakers, getSpeakerById };
