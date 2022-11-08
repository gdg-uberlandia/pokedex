import { db } from "~/services/firebase.server"
import { COLLECTIONS } from "~/utils/collections";
import type { Profile } from "./types";

export const getAllProfiles = () => { };

export const getById = async (id: string): Promise<Profile> => {
  const docSnapshot = await db.collection(COLLECTIONS.PROFILES).doc(id).get();

  if (!docSnapshot.exists) {
    throw Error("No such document exists");
  } else {
    const profile: Profile = {
      ...(docSnapshot.data() as Profile),
      id: docSnapshot.id,
    };
    return profile;
  }
};

//https://github.com/ianlenehan/my-remix-app/blob/master/app/post.js
export const getProfileByCode = async (
  code: string
): Promise<Profile | null> => {
  const querySnapshot = await db
    .collection(COLLECTIONS.PROFILES)
    .where("code", "==", code)
    .get();

  const data: Array<Profile> = [];
  querySnapshot.forEach((doc: any) => {
    data.push({ ...doc.data(), id: doc.id });
  });

  if (data.length < 0) return null;

  return data[0];
};

export const updateProfile = async (
  id: string,
  profile: Profile
): Promise<Profile> => {
  const docRef = db.collection(COLLECTIONS.PROFILES).doc(id);

  await docRef.update({ ...profile });

  return getById(id);
};
