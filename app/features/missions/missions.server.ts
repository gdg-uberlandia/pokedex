import { Mission, Profile } from "../profiles/types";
import { MISSIONS_LIST } from "./missions";

export const checkAndCreateMissions = async (_profile: Profile) => {
  const missions = _profile.contents.missions ?? [];
  const missionsMap = new Map(missions.map(({ id }) => [id, id]));
  const notCompletedMissions = MISSIONS_LIST.filter(
    ({ id }) => !missionsMap.get(id)
  );

  const missionsEvaluated = await Promise.all(
    notCompletedMissions.map(async (m) => ({
      evaluated: await m.evaluate?.(_profile),
      mission: m,
    }))
  );

  const completedMissions: Array<Mission> = [];
  for (const m of missionsEvaluated) {
    if (m.evaluated)
      completedMissions.push({
        id: m.mission.id,
      });
  }

  if (_profile.contents.missions) {
    _profile.contents.missions = [
      ..._profile.contents.missions,
      ...completedMissions,
    ];
    return;
  }

  _profile.contents.missions = completedMissions;
  return;
};
