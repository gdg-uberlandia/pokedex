import type { Speaker } from "../speakers/types";

const mapSpeakersById = (speakers: Speaker[]) =>
  speakers.reduce(
    (acc, speaker) => ({
      ...acc,
      [speaker.id]: speaker,
    }),
    {}
  );

export { mapSpeakersById };
