import { COLLECTIONS } from "~/utils/collections";
import { TIME_TO_EXPIRE_EVALUATION } from "~/utils/config";
import { get } from "lodash";
import type { Schedule, Speech } from "./types";
import { db } from "~/services/firebase.server";
import { getSpeakers } from "~/features/speakers/speakers.schedule.server";
import { mapSpeakersById, getMinutesBetweenDates } from "./utils";

const getScheduleById = async (id: string): Promise<Schedule> => {
  const docSnapshot = await db.collection(COLLECTIONS.SCHEDULE).doc(id).get();

  if (!docSnapshot.exists) {
    throw Error("No such document exists");
  } else {
    const schedule: Schedule = {
      ...(docSnapshot.data() as Schedule),
      id: docSnapshot.id,
    };
    return schedule;
  }
};

const getSchedule = async (): Promise<Array<Schedule>> => {
  const scheduleQuerySnapshot = await db.collection(COLLECTIONS.SCHEDULE).get();
  const speakers = await getSpeakers();
  // filter Speakers with evaluation time finished
  const filteredSpeakers = speakers.filter((speaker) => {
    if (
      speaker.evaluationStartTime &&
      getMinutesBetweenDates(
        new Date(speaker.evaluationStartTime),
        new Date()
      ) > TIME_TO_EXPIRE_EVALUATION
    ) {
      return false;
    }
    return true;
  });

  return scheduleQuerySnapshot.docs.map((doc) => {
    const schedule = { ...doc.data(), id: doc.id } as Schedule;

    return {
      ...schedule,
      speeches: schedule.speeches.reduce((acc, scheduleDoc) => {
        if (scheduleDoc.speakerSlugs) {
          if (scheduleDoc.speakerSlugs.length === 1) {
            const speaker = get(
              mapSpeakersById(filteredSpeakers),
              scheduleDoc.speakerSlugs
            );
            if (!speaker) {
              // if can't find speaker (probably speaker's evaluation time is over)
              return acc;
            }

            return [...acc, { ...scheduleDoc, ...speaker }];
          } else {
            for (var i = 0; i < scheduleDoc.speakerSlugs.length; i++) {
              const speaker = get(
                mapSpeakersById(filteredSpeakers),
                scheduleDoc.speakerSlugs[i]
              );
              if (speaker) {
                acc = [...acc, { ...scheduleDoc, ...speaker }];
              }
            }
          }
        }

        return acc;
      }, [] as Speech[]),
    };
  });
};

export { getScheduleById, getSchedule };
