import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { Card } from "~/components";
import { Talk as TalkComponent } from "./Talk";
import { getUser } from "~/features/users/user.server";
import { getProfileByEmail } from "~/features/profiles/profile.server";
import { getSchedule } from "~/features/schedule/schedule.server";
import type { Schedule as ScheduleType } from "~/features/schedule/types";
import { EvaluationButton } from "./EvaluationButton";
import { convertScheduleToTalks } from "./utils";
import { find } from "lodash";

type LoaderData = {
  profile: Awaited<ReturnType<typeof getProfileByEmail>>;
  schedule: ScheduleType[];
};

export async function loader({ request }: LoaderArgs) {
  const data = await getUser(request);
  const profile = await getProfileByEmail(data.email || "");
  const schedule = await getSchedule();

  return json<LoaderData>({ profile, schedule });
}

export default function Schedule() {
  const { profile, schedule } = useLoaderData<typeof loader>();
  const talks = convertScheduleToTalks(schedule);

  return (
    <Card title="Palestras">
      {talks.map((talk, key) => (
        <TalkComponent key={key} {...talk}>
          {profile?.user?.isAdmin ? (
            <EvaluationButton
              canBeEvaluated={talk.canBeEvaluated}
              isDisabled={talk.canBeEvaluated}
              isAdmin={true}
              onClick={() => {
                // TODO: add call to allowSpeakerEvaluation
              }}
            />
          ) : (
            <Link to={`/schedule/${talk.sectionId}/talk/${talk.id}`}>
              <EvaluationButton
                canBeEvaluated={talk.canBeEvaluated}
                isDisabled={!talk.canBeEvaluated}
                isAdmin={false}
                wasEvaluated={
                  !!find(profile?.contents?.evaluations, [
                    "speakerSlug",
                    talk.id,
                  ])
                }
              />
            </Link>
          )}
        </TalkComponent>
      ))}
    </Card>
  );
}
