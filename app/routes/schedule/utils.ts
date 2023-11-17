import { get, pick } from "lodash";
import type { Schedule, Speech } from "~/features/schedule/types";
import { paths } from "./constants";
import type { Talk } from "./types";

const addPathInfoToSpeeches = (speeches: Speech[]) => {
  return speeches.map((speech) => ({
    ...pick(speech, ["id", "name", "photo", "topic", "canBeEvaluated"]),
    path: get(paths, speech.path ?? "", ""),
  }));
};

const convertScheduleToTalks = (schedule: Schedule[]) => {
  return schedule.reduce(
    (acc, section) => [...acc, ...addPathInfoToSpeeches(section.speeches)],
    [] as Talk[]
  );
};

export { addPathInfoToSpeeches, convertScheduleToTalks };
