import { get, pick } from "lodash";
import type { Schedule, Speech } from "~/features/schedule/types";
import { paths } from "./constants";
import type { Talk } from "./types";

const addPathInfoToSpeeches = ({
  speeches,
  sectionId,
}: {
  speeches: Speech[];
  sectionId: string;
}) => {
  return speeches.map((speech) => ({
    ...pick(speech, ["id", "name", "photo", "topic", "canBeEvaluated"]),
    sectionId,
    path: get(paths, speech.path ?? "", ""),
  }));
};

const convertScheduleToTalks = (schedule: Schedule[]) => {
  return schedule.reduce(
    (acc, section) => [
      ...acc,
      ...addPathInfoToSpeeches({
        speeches: section.speeches,
        sectionId: section.id,
      }),
    ],
    [] as Talk[]
  );
};

export { addPathInfoToSpeeches, convertScheduleToTalks };
