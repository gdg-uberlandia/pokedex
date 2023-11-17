import { COLLECTIONS } from "~/utils/collections";
import { get } from "lodash";
import type { Schedule, Speech } from "./types";
import { db } from "~/services/firebase.server";
import { getSpeakers } from "~/features/speakers/speakers.schedule.server";
import { mapSpeakersById } from "./utils";

const getSchedule = async (): Promise<Array<Schedule>> => {
  const scheduleQuerySnapshot = await db.collection(COLLECTIONS.SCHEDULE).get();
  const speakers = await getSpeakers();

  return scheduleQuerySnapshot.docs.map((doc) => {
    const schedule = { ...doc.data(), id: doc.id } as Schedule;

    return {
      ...schedule,
      speeches: schedule.speeches.reduce((acc, scheduleDoc) => {
        if (scheduleDoc.speaker_id) {
          const speaker = get(
            mapSpeakersById(speakers),
            scheduleDoc.speaker_id
          );

          return [...acc, { ...scheduleDoc, ...speaker }];
        }

        return acc;
      }, [] as Speech[]),
    };
  });
};

export { getSchedule };
