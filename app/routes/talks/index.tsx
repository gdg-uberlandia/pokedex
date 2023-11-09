import { Card } from "~/components";
import Talk from "./Talk";
import { talks } from "./mock";

export default function Talks() {
  return (
    <Card title="Pokédex">
      {talks.map((talk, key) => (
        <Talk key={key} {...talk} />
      ))}
    </Card>
  );
}
