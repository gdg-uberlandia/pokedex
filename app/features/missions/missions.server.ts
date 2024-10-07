import { Mission, Profile } from "../profiles/types";
import { MISSIONS_LIST } from "./missions";

export const checkAndCreateMissions = async (
  profile: Profile,
  profileToAdd: Profile
) => {
  const completedMissions = MISSIONS_LIST.filter((mission) =>
    mission.evaluate?.(profile, profileToAdd)
  );

  const missionsToAdd: Array<Mission> = completedMissions.map((mission) => ({
    id: mission.id,
  }));

  profile.contents.missions.concat(missionsToAdd);
};
