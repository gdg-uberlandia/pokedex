import { Button } from "~/components";

function EvaluationButton({
  canBeEvaluated = false,
  isAdmin,
  isDisabled,
  wasEvaluated = false,
  onClick,
}: {
  canBeEvaluated?: boolean;
  isAdmin: boolean;
  isDisabled: boolean;
  wasEvaluated?: boolean;
  onClick?: () => void;
}) {
  const getLabel = () => {
    if (isAdmin) {
      return isDisabled ? "Avaliação liberada" : "Liberar avaliação";
    }

    if (wasEvaluated) return "Avaliado";

    return canBeEvaluated ? "Avaliar" : "Não disponível";
  };

  return (
    <Button
      disabled={isDisabled || wasEvaluated}
      onClick={onClick}
      full
      primary
      small
      style={wasEvaluated ? { color: "green", borderColor: "green" } : {}}
    >
      {getLabel()}
    </Button>
  );
}

export { EvaluationButton };
