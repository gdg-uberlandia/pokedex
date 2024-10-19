import { Image } from "~/components";

interface RankItemProps {
  image: string;
  name: string;
  position: number;
  score: number;
}

export function RankItem({
  image = "",
  name = "",
  position = 1,
  score = 0,
}: RankItemProps) {
  return (
    <section className="flex items-center my-1 p-1.5 bg-white font-normal font-press text-black text-xs border-2 border-black rounded-b">
      <div className="flex justify-center items-center w-[36px] h-[36px] shrink-0 p-1.5 mr-1 bg-black text-white rounded-b">{position}</div>
      <section className="flex flex-start items-center grow">
        <Image className={`w-[36px] h-[36px] mr-1 rounded-b`} src={image} alt={name} />
        <h1 className="mr-2">{name}</h1>
      </section>
      <p className="w-[50px] shrink-0 text-right">{score}<br/>pts</p>
    </section>
  );
}
