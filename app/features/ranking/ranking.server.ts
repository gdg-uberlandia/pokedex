import { COLLECTIONS } from "~/utils/collections";
import { db } from "~/services/firebase.server";
import type { RankedUser } from "./types";

export const getRanking = async (): Promise<Array<RankedUser>> => {
  const rankingSnapshot = await db.collection(COLLECTIONS.PROFILES)
    .orderBy("score", "desc")
    .limit(10)
    .get();

  const rankedUsers: Array<RankedUser> = rankingSnapshot.docs.map((doc, index) => {
    return{
      avatarUrl: doc.data().user.photoUrl,
      id: doc.data().user.userId,
      name: doc.data().user.name,
      position: index + 1,
      score: doc.data().score,
    } as RankedUser
  });

  return rankedUsers;
};
