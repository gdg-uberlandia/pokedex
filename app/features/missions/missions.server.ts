import { Mission, Profile } from "../profiles/types";
import { MISSIONS_LIST } from "./missions";

export const checkAndCreateMissions = async (profile: Profile) => {
  const missions = profile.contents.missions ?? [];
  const missionsMap = new Map(missions.map(({ id }) => [id, id]));
  const notCompletedMissions = MISSIONS_LIST.filter(
    ({ id }) => !missionsMap.get(id)
  );

  const missionsEvaluated = await Promise.all(
    notCompletedMissions.map(async (m) => ({
      evaluated: await m.evaluate?.(profile),
      mission: m,
    }))
  );

  const completedMissions: Array<Mission> = [];
  for (const m of missionsEvaluated) {
    if (m.evaluated) completedMissions.push(m.mission);
  }

  if (profile.contents.missions) {
    profile.contents.missions.concat(completedMissions);
    return;
  }

  profile.contents.missions = [];
  return;
};
