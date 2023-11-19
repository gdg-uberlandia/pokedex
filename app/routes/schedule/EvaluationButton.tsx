import { Button } from "~/components";

function EvaluationButton({
  canBeEvaluated = false,
  isAdmin,
}: {
  canBeEvaluated?: boolean;
  isAdmin: boolean;
}) {
  const getLabel = () => {
    if (isAdmin) return "Liberar avaliação";

    return canBeEvaluated ? "Avaliar" : "Não disponível";
  };

  return (
    <Button disabled={!canBeEvaluated} full primary small>
      {getLabel()}
    </Button>
  );
}

export { EvaluationButton };
