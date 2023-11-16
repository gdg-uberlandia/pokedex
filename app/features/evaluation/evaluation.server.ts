import { find } from "lodash";
import { COLLECTIONS } from "~/utils/collections";
import { SCORES } from "~/utils/scores";
import type { Evaluation } from "./types";
import type { EvaluationIds } from "../profiles/types"
import { db } from "~/services/firebase.server";
import {getAndCheckProfileByEmail, checkAndCreateAwards, updateProfile} from "../profiles/profile.server"
import ShowableError from "~/utils/errors";

export const addEvaluation = async (scheduleId: string, evaluation: Evaluation, email?: string)=> {
    const _profile = await getAndCheckProfileByEmail(email);

    const _resultSpeakerSlug = find(_profile.contents?.evaluations, ["speakerSlug", evaluation.speakerSlug]);
    if (_resultSpeakerSlug) {
        throw new ShowableError("Você já avaliou esta palestra");
    }

    const _resultScheduleId = find(_profile.contents?.evaluations, ["scheduleId", scheduleId]);
    if (_resultScheduleId) {
        throw new ShowableError("Você já avaliou uma palestra da mesma grade.");
    }

    await db.collection(COLLECTIONS.EVALUATION).add(evaluation);

    const evaluationIds: EvaluationIds = {
        scheduleId,
        speakerSlug: evaluation.speakerSlug
    }

    _profile.contents.evaluations = [..._profile.contents.evaluations, evaluationIds];

    _profile.score = _profile.score! + SCORES.EVALUATION;

    await checkAndCreateAwards(_profile);

    return await updateProfile(_profile.id!, _profile);
}