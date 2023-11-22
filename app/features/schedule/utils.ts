import type { Speaker } from "../speakers/types";

const mapSpeakersById = (speakers: Speaker[]) =>
  speakers.reduce(
    (acc, speaker) => ({
      ...acc,
      [speaker.id]: speaker,
    }),
    {}
  );

const getMinutesBetweenDates = (startDate: Date, endDate: Date) => {
  const diff = endDate.getTime() - startDate.getTime();

  return diff / 60000;
};

export { mapSpeakersById, getMinutesBetweenDates };
