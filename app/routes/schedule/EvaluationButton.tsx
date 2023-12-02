import { Link, Form } from "@remix-run/react";
import { some } from "lodash";
import { Button as ButtonComponent } from "~/components";
import type { Profile } from "~/features/profiles/types";

type Props = {
  canBeEvaluated?: boolean;
  evaluations?: Profile["contents"]["evaluations"];
  isAdmin?: boolean;
  speakerSlug: string;
  sectionId: string;
};

const canTalkBeEvaluated = ({
  canBeEvaluated,
  isAdmin,
  isAlreadyEvaluated,
}: any) => {
  if (isAdmin) {
    return canBeEvaluated;
  }

  return !canBeEvaluated || isAlreadyEvaluated;
};

function Button({
  canBeEvaluated,
  isAdmin,
  isAlreadyEvaluated,
  speakerSlug,
}: {
  canBeEvaluated: boolean;
  isAdmin: boolean;
  isAlreadyEvaluated: boolean;
  speakerSlug: string;
}) {
  const getLabel = () => {
    if (isAdmin) {
      return canBeEvaluated ? "Avaliação liberada" : "Liberar avaliação";
    }

    if (isAlreadyEvaluated) return "Avaliado";

    return canBeEvaluated ? "Avaliar" : "Não disponível";
  };

  return (
    <ButtonComponent
      disabled={canTalkBeEvaluated({
        canBeEvaluated,
        isAdmin,
        isAlreadyEvaluated,
      })}
      value={speakerSlug}
      type="submit"
      name="_speakerSlug"
      full
      primary
      small
      variant={isAlreadyEvaluated ? "success" : ""}
    >
      {getLabel()}
    </ButtonComponent>
  );
}

function EvaluationButton({
  canBeEvaluated = false,
  evaluations = [],
  isAdmin = false,
  speakerSlug,
  sectionId,
}: Props) {
  const isAlreadyEvaluated = some(evaluations, ["speakerSlug", speakerSlug]);

  const children = (
    <Button
      canBeEvaluated={canBeEvaluated}
      isAdmin={isAdmin}
      isAlreadyEvaluated={isAlreadyEvaluated}
      speakerSlug={speakerSlug}
    />
  );

  if (isAdmin) return <Form method="post">{children}</Form>;

  return (
    <Link
      to={`/schedule/${sectionId}/talk/${speakerSlug}`}
      state={{ backTo: "/schedule" }}
    >
      {children}
    </Link>
  );
}

export { EvaluationButton };
