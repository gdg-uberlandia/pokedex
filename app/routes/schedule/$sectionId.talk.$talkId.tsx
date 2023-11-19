import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { getSpeakerById } from "~/features/speakers/speakers.schedule.server";
import { getUser } from "~/features/users/user.server";
import { addEvaluation } from "~/features/evaluation/evaluation.server";
import { getProfileByEmail } from "~/features/profiles/profile.server";
import { Card } from "~/components";
import { Talk as TalkComponent } from "./Talk";
import { Evaluation as EvaluationComponent } from "./Evaluation";
import { ROUTES } from "~/utils/routes";

type LoaderData = {
  speaker: Awaited<ReturnType<typeof getSpeakerById>>;
  profile: Awaited<ReturnType<typeof getProfileByEmail>>;
  sectionId?: string;
};

export async function loader({ request, params }: LoaderArgs) {
  const data = await getUser(request);
  const speaker = await getSpeakerById(params.talkId);
  const profile = await getProfileByEmail(data.email || "");

  return json<LoaderData>({ speaker, profile, sectionId: params.sectionId });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const { _form } = Object.fromEntries(formData);
  const { scheduleId, evaluation, userEmail } = JSON.parse(_form as string);

  try {
    await addEvaluation(scheduleId, evaluation, userEmail);

    return redirect(ROUTES.SCHEDULE);
  } catch (error) {
    throw error;
  }
}

export default function Talk() {
  const { speaker, profile, sectionId } = useLoaderData<typeof loader>();

  const evaluationData = {
    scheduleId: sectionId,
    speakerSlug: speaker.id,
    evaluatedBy: profile?.id,
    userEmail: profile?.user.email,
  };

  return (
    <Card title="Feedback">
      <h2 className="mb-8 text-center font-press text-[12px] text-black">
        Qual a sua avaliação para a palestra abaixo?
      </h2>

      <TalkComponent {...speaker}>
        <Form method="post">
          <EvaluationComponent data={evaluationData} />
        </Form>
      </TalkComponent>
    </Card>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Card title="Feedback">
      <h2 className="text-center font-press text-[12px] text-black">
        {error.message}
      </h2>
    </Card>
  );
}
