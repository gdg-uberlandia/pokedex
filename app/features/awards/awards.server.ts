import { db } from "~/services/firebase.server";
import { COLLECTIONS } from "~/utils/collections";
import type { Profile } from "../profiles/types";
import type { Award } from "./types";

export const getAwardById = async (id: string): Promise<Award> => {
  const docSnapshot = await db.collection(COLLECTIONS.AWARDS).doc(id).get();

  if (!docSnapshot.exists) {
    throw Error("No such document exists");
  } else {
    const profile: Award = {
      ...(docSnapshot.data() as Award),
      id: docSnapshot.id,
    };
    return profile;
  }
};

export const consumeAward = async (id: string): Promise<Award> => {
  const docRef = db.collection(COLLECTIONS.AWARDS).doc(id);
  const award = await getAwardById(id);
  const awardToUpdate = { ...award, consumed: true };

  const profileRef = await db
    .collection(COLLECTIONS.PROFILES)
    .doc(award.user_id);
  const profileSnapshot = await profileRef.get();
  if (profileSnapshot.exists) {
    const _profile: Profile = {
      ...(profileSnapshot.data() as Profile),
      id: profileSnapshot.id,
    };
    _profile.contents.awards = [awardToUpdate];
    await profileRef.update({ ..._profile });
  }

  await docRef.update(awardToUpdate);

  return getAwardById(id);
};
