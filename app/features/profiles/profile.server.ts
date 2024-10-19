import { find, merge } from "lodash";
import { db } from "~/services/firebase.server";
import { COLLECTIONS } from "~/utils/collections";
import { SCORES } from "~/utils/scores";
import { LEVELS, LEVEL_THRESHOLD } from "~/utils/levels";
import type { Award, Company, Profile, Tag } from "./types";
import ShowableError from "~/utils/errors";
import { createBrandNewProfile } from "~/utils/profile";
import { checkAndCreateMissions } from "../missions/missions.server";

export const getProfileById = async (id?: string): Promise<Profile | null> => {
  if (!id) {
    return null;
  }
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

export const getProfileByEmail = async (
  email: string
): Promise<Profile | null> => {
  if (!email) {
    return null;
  }
  const querySnapshot = await db
    .collection(COLLECTIONS.PROFILES)
    .where("user.email", "==", email)
    .get();

  const data: Array<Profile> = [];
  querySnapshot.forEach((doc: any) => {
    data.push({ ...doc.data(), id: doc.id });
  });

  if (data.length < 0) {
    return null;
  }

  return data[0];
};

export const updateProfile = async (
  id: string,
  profile: Partial<Profile>
): Promise<Profile | null> => {
  const docRef = await db.collection(COLLECTIONS.PROFILES).doc(id);

  await docRef.update({ ...profile });

  return getProfileById(id);
};

export const createProfile = async (profile: Partial<Profile>) => {
  const profileRef = await db.collection(COLLECTIONS.PROFILES).add(profile);
  const _profile = await profileRef.get();

  return {
    ..._profile.data(),
    key: profile.id,
  };
};

export const registerProfile = async (user: Profile["user"]) => {
  const _existedProfile = await getProfileByEmail(user.email);

  if (_existedProfile) {
    return await updateProfile(
      _existedProfile.id!,
      merge(_existedProfile, { user })
    );
  } else {
    return createProfile(createBrandNewProfile(user));
  }
};

export const getAndCheckProfileByEmail = async (
  email?: string
): Promise<Profile> => {
  if (!email) {
    throw new ShowableError(
      "Perfil não associado. Logue novamente para conseguir adicionar"
    );
  }
  const _profile = await getProfileByEmail(email);

  if (!_profile)
    throw new ShowableError(
      "Perfil não associado. Logue novamente para conseguir adicionar"
    );

  return _profile;
};

export const addProfile = async (
  email?: string,
  profileToAdd?: Profile | null
) => {
  const _profile = await getAndCheckProfileByEmail(email);

  if (!profileToAdd) {
    throw new ShowableError(" Perfil buscado inválido!");
  }

  if (profileToAdd.id == _profile.id) {
    throw new ShowableError(
      " Não seria legal se pudesse adicionar seu próprio perfil!"
    );
  }

  const _result = find(_profile.contents?.profiles, ["id", profileToAdd.id]);
  if (_result) {
    throw new ShowableError("Perfil já adicionado!");
  }

  _profile.contents.profiles = [..._profile.contents.profiles, profileToAdd];

  const scoreToAdd = profileToAdd.shine ? SCORES.PROFILE_SHINE : SCORES.PROFILE;
  _profile.score = _profile.score! + scoreToAdd;

  try {
    await checkAndCreateMissions(_profile);
  } catch (error) {
    throw new ShowableError("checkAndCreateMissions: " + JSON.stringify(error));
  }

  try {
    await checkAndCreateAwards(_profile);
  } catch (error) {
    throw new ShowableError("checkAndCreateAwards: " + JSON.stringify(error));
  }

  try {
    return await updateProfile(_profile.id!, _profile);
  } catch (error) {
    console.log("error", error);
    throw new ShowableError("updateProfile: " + profileToAdd.id);
  }
};

export const addCompany = async (
  email?: string,
  companyToAdd?: Company | null
) => {
  const _profile = await getAndCheckProfileByEmail(email);

  if (!companyToAdd) {
    throw new ShowableError(" Empresa buscada inválido!");
  }

  const _result = find(_profile.contents?.companies, ["id", companyToAdd.id]);
  if (_result) {
    throw new ShowableError("Empresa já adicionada!");
  }

  _profile.contents.companies = [..._profile.contents.companies, companyToAdd];

  _profile.score = _profile.score! + SCORES.COMPANY;

  try {
    await checkAndCreateMissions(_profile);
  } catch (error) {
    throw new ShowableError("checkAndCreateMissions: " + JSON.stringify(error));
  }

  await checkAndCreateAwards(_profile);

  return await updateProfile(_profile.id!, _profile);
};

export const addTag = async (email?: string, tagToAdd?: Tag | null) => {
  const _profile = await getAndCheckProfileByEmail(email);

  if (!tagToAdd) {
    throw new ShowableError("Tag buscada inválida!");
  }

  const _result = find(_profile.contents?.tags, ["id", tagToAdd.id]);
  if (_result) {
    throw new ShowableError("Tag já adicionada!");
  }

  _profile.contents.tags = [..._profile.contents.tags, tagToAdd];

  try {
    await checkAndCreateMissions(_profile);
  } catch (error) {
    throw new ShowableError("checkAndCreateMissions: " + JSON.stringify(error));
  }

  _profile.score = _profile.score! + SCORES.TAG;

  await checkAndCreateAwards(_profile);

  return await updateProfile(_profile.id!, _profile);
};

export const checkAndCreateAwards = async (profile: Profile) => {
  if (
    profile &&
    profile?.score &&
    profile.score >= LEVELS[LEVEL_THRESHOLD] &&
    (!profile.contents.awards || profile.contents.awards?.length <= 0)
  ) {
    const award = { consumed: false, user_id: profile.id };
    const awardRef = await db.collection(COLLECTIONS.AWARDS).add(award);
    const _award = await awardRef.get();
    const awardFinal: Award = { ..._award.data(), id: _award.id };
    await awardRef.update({ ...awardFinal });
    if (profile.contents?.awards?.length) {
      profile.contents.awards = [...profile.contents.awards, awardFinal];
    } else {
      profile.contents.awards = [awardFinal];
    }
  }
};
