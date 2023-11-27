import { get, pick } from "lodash";
import type { Schedule, Speech } from "~/features/schedule/types";
import { paths } from "./constants";

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

const convertScheduleToSections = (schedule: Schedule[]) => {
  const sectionsWithTalks = schedule.filter(({ speeches }) => speeches.length);

  return sectionsWithTalks.reduce(
    (acc, section) => [
      ...acc,
      {
        ...section,
        speeches: addPathInfoToSpeeches({
          speeches: section.speeches,
          sectionId: section.id,
        }),
      },
    ],
    [] as any // TODO: remove this any
  );
};

export { addPathInfoToSpeeches, convertScheduleToSections };
