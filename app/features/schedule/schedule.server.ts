import { COLLECTIONS } from "~/utils/collections";
import type { Schedule, Speech } from "./types";
import { db } from "~/services/firebase.server";
import {getSpeakers} from "../speakers/speakers.schedule.server"

export const getSchedule = async (): Promise<Array<Schedule>> => {
    const scheduleQuerySnapshot = await db.collection(COLLECTIONS.SCHEDULE).get();
    const speakers = await getSpeakers();
    const schedule: Array<Schedule> = scheduleQuerySnapshot.docs.map(doc => 
        {
            const schedule = {...doc.data()} as Schedule
            schedule.speeches = schedule.speeches.map(scheduleDoc => {
                if(scheduleDoc.speakerSlug){
                    const speaker = speakers.find(speaker => speaker.speakerSlug === scheduleDoc.speakerSlug);
                    return {...scheduleDoc, speaker}
                }
                return {...scheduleDoc}
            });
            return schedule;
        });
    return schedule;
}