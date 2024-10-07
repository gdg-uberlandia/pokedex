import { Mission } from "~/features/profiles/types";
import { Image } from "../Image";
import { MISSIONS_LIST } from "~/features/missions/missions";
import { LinksFunction } from "@remix-run/server-runtime";

import styles from "./styles.css";

interface Props {
  missions: Array<Mission>;
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const MissionsCarrousel = ({ missions }: Props) => {
  const missionsMapById = new Map(
    MISSIONS_LIST.map((mission) => [mission.id, mission])
  );

  const missionsOverflow = missions.length > 2;

  return (
    <section className="my-3 text-center">
      <h3 className="font-crux text-xl leading-5">Seus selos</h3>

      <article className="my-3 h-32 overflow-hidden">
        <div
          className={`missions__container flex gap-3 overflow-x-auto px-3 pb-[26px] ${
            missionsOverflow ? "justify-start" : "justify-center"
          }`}
        >
          {missions.map((stamp) => {
            const mission = missionsMapById.get(stamp.id);

            if (!mission) {
              return null;
            }

            return (
              <div
                key={stamp.id}
                className={`missions__item flex h-28 w-[118px] flex-none flex-col items-center justify-center gap-3 rounded-lg border-2 border-black`}
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

      <div className="mx-auto -mt-2 flex w-fit gap-1">
        <span className="flex h-[5px] w-[5px] bg-black" />
        <span className="flex h-[5px] w-[5px] bg-gray" />
      </div>
    </section>
  );
};
