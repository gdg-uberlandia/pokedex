import { Link } from "@remix-run/react";
import { Button, Card } from "~/components";
import { Talk } from "./Talk";
import { talks } from "./mock";

export default function Talks() {
  return (
    <Card title="Palestras">
      {talks.map((talk, key) => (
        <Talk key={key} {...talk}>
          <Link to={`/talks/${talk.id}`}>
            <Button disabled={!talk.canBeEvaluated} full primary small>
              {talk.canBeEvaluated ? "Avaliar" : "Não disponível"}
            </Button>
          </Link>
        </Talk>
      ))}
    </Card>
  );
}
