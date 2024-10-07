import { Stamp } from "~/features/profiles/types";
import { Image } from "../Image";
import { MISSIONS_LIST } from "~/features/missions/missions";
import { LinksFunction } from "@remix-run/server-runtime";

import styles from "./styles.css";

interface Props {
  stamps: Array<Stamp>;
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const MissionsCarrousel = ({ stamps }: Props) => {
  const missionsMapById = new Map(
    MISSIONS_LIST.map((mission) => [mission.id, mission])
  );

  const stampsOverflow = stamps.length > 2;

  return (
    <section className="my-3 text-center">
      <h3 className="font-crux text-xl leading-5">Seus selos</h3>

      <article className="my-3 h-32 overflow-hidden">
        <div
          className={`stamps__container flex gap-3 overflow-x-auto px-3 pb-[26px] ${
            stampsOverflow ? "justify-start" : "justify-center"
          }`}
        >
          {stamps.map((stamp) => {
            const mission = missionsMapById.get(stamp.id);

            if (!mission) {
              return null;
            }

            return (
              <div
                key={stamp.id}
                className={`stamps__item flex h-28 w-[118px] flex-none flex-col items-center justify-center gap-3 rounded-lg border-2 border-black`}
              >
                <Image
                  src={`images/${mission.icon.src}`}
                  alt={mission.icon.alt}
                  className="h-12 w-12 object-contain"
                />

                <p className="font-crux text-[22px] leading-[22px]">
                  {mission.title}
                </p>
              </div>
            );
          })}
        </div>
      </article>

      <div className="mx-auto flex w-fit gap-2">
        <span className="flex h-[5px] w-[5px] bg-black" />
        <span className="flex h-[5px] w-[5px] bg-gray" />
      </div>
    </section>
  );
};
