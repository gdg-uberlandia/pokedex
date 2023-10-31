import { COLLECTIONS } from "~/utils/collections";
import type { Company } from "../profiles/types";
import { db } from "~/services/firebase.server";

export const getAllCompanies = () => {};

export const getCompanyById = async (id: string): Promise<Company> => {
  const docSnapshot = await db.collection(COLLECTIONS.COMPANIES).doc(id).get();

  if (!docSnapshot.exists) {
    throw Error("No such document exists");
  } else {
    const company: Company = {
      ...(docSnapshot.data() as Company),
      id: docSnapshot.id,
    };
    return company;
  }
};
