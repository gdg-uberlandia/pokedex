import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card } from "~/components";
import { Talk as TalkComponent } from "./Talk";
import { getUser } from "~/features/users/user.server";
import { getProfileByEmail } from "~/features/profiles/profile.server";
import { getSchedule } from "~/features/schedule/schedule.server";
import { allowSpeakerEvaluation } from "~/features/speakers/speakers.schedule.server";
import type { Schedule as ScheduleType } from "~/features/schedule/types";
import { EvaluationButton } from "./EvaluationButton";
import { convertScheduleToTalks } from "./utils";
import { ROUTES } from "~/utils/routes";

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

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const { _speakerSlug } = Object.fromEntries(formData);

  await allowSpeakerEvaluation(String(_speakerSlug));

  return redirect(ROUTES.SCHEDULE);
}

export default function Schedule() {
  const { profile, schedule } = useLoaderData<typeof loader>();
  const talks = convertScheduleToTalks(schedule);

  return (
    <Card title="Palestras">
      {talks.map((talk, key) => (
        <TalkComponent key={key} {...talk}>
          <EvaluationButton
            canBeEvaluated={talk.canBeEvaluated}
            isAdmin={profile?.user.isAdmin}
            evaluations={profile?.contents.evaluations}
            speakerSlug={talk.id}
            sectionId={talk.sectionId}
          />
        </TalkComponent>
      ))}
    </Card>
  );
}
