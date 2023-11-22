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

const allowSpeakerEvaluation = async (speakerSlug: string) => {
  const docRef = await db.collection(COLLECTIONS.SPEAKERS).doc(speakerSlug);
  const speakerQuerySnapshot = await docRef.get();

  if (!speakerQuerySnapshot.exists) {
    throw Error("Palestrante não encontrado");
  }

  const speaker: Speaker = {
    ...(speakerQuerySnapshot.data() as Speaker),
    speakerSlug: speakerQuerySnapshot.id,
  };

  speaker.canBeEvaluated = true;
  speaker.evaluationStartTime = new Date().toISOString();

  await docRef.update({ ...speaker });
};

export { getSpeakers, getSpeakerById, allowSpeakerEvaluation };
