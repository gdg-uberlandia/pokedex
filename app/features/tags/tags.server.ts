import { COLLECTIONS } from "~/utils/collections";
import type { Tag } from "../profiles/types";
import { db } from "~/services/firebase.server";

export const getAllCompanies = () => {};

export const getTagById = async (id: string): Promise<Tag> => {
  const docSnapshot = await db.collection(COLLECTIONS.TAGS).doc(id).get();

  if (!docSnapshot.exists) {
    throw Error("No such document exists");
  } else {
    const company: Tag = {
      ...(docSnapshot.data() as Tag),
      id: docSnapshot.id,
    };
    return company;
  }
};
