import { find } from "lodash";
import { COLLECTIONS } from "~/utils/collections";
import { SCORES } from "~/utils/scores";
import { TIME_TO_EXPIRE_EVALUATION } from "~/utils/config";
import type { Evaluation } from "./types";
import type { EvaluationIds } from "../profiles/types";
import { db } from "~/services/firebase.server";
import {
  getAndCheckProfileByEmail,
  checkAndCreateAwards,
  updateProfile,
} from "../profiles/profile.server";
import ShowableError from "~/utils/errors";
import { getScheduleById } from "~/features/schedule/schedule.server";
import { getSpeakerById } from "~/features/speakers/speakers.schedule.server";
import { getMinutesBetweenDates } from "~/features/schedule/utils";

export const addEvaluation = async (
  scheduleId: string,
  evaluation: Evaluation,
  email: string
) => {
  const _profile = await getAndCheckProfileByEmail(email);

  const _resultSpeakerSlug = find(_profile.contents?.evaluations, [
    "speakerSlug",
    evaluation.speakerSlug,
  ]);
  if (_resultSpeakerSlug) {
    throw new ShowableError("Você já avaliou esta palestra");
  }

  const schedule = await getScheduleById(scheduleId);
  const speech = schedule.speeches.filter((obj) =>
    obj?.speakerSlugs?.includes(evaluation.speakerSlug)
  );
  const isCommunity = speech[0]?.path?.toUpperCase() === "COMUNIDADE";
  let evaluations = _profile.contents?.evaluations.filter(
    (evaluation) => evaluation.scheduleId === scheduleId
  );
  if (evaluations.length) {
    evaluations = evaluations.map((evaluation) => {
      const speech = schedule.speeches.filter((obj) =>
        obj?.speakerSlugs?.includes(evaluation.speakerSlug)
      );
      if (speech) {
        return { ...evaluation, path: speech[0]?.path };
      }
      return { ...evaluation };
    });
  }
  if (evaluations.length && evaluations.length >= 2) {
    throw new ShowableError(
      "Você já atingiu o máximo de avaliações em uma grade."
    );
  }

  if (
    evaluations.length &&
    (evaluations[0]?.path != "COMUNIDADE" || !isCommunity)
  ) {
    throw new ShowableError("Você já avaliou uma palestra da mesma grade.");
  }

  const speaker = await getSpeakerById(evaluation.speakerSlug);
  if (!speaker.canBeEvaluated) {
    throw new ShowableError("Palestrante não habilitado para ser avaliado.");
  }
  if (
    speaker.evaluationStartTime &&
    getMinutesBetweenDates(new Date(speaker.evaluationStartTime), new Date()) >
      TIME_TO_EXPIRE_EVALUATION
  ) {
    throw new ShowableError("Avaliação do palestrante já está expirada");
  }
  await db.collection(COLLECTIONS.EVALUATIONS).add(evaluation);

  const evaluationIds: EvaluationIds = {
    scheduleId,
    speakerSlug: evaluation.speakerSlug,
  };

  _profile.contents.evaluations = _profile.contents.evaluations
    ? [..._profile.contents?.evaluations, evaluationIds]
    : [evaluationIds];

  const newScore = isCommunity ? SCORES.EVALUATION / 2 : SCORES.EVALUATION;

  _profile.score = _profile.score! + newScore;

  await checkAndCreateAwards(_profile);

  return await updateProfile(_profile.id!, _profile);
};
