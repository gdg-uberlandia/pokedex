import { Stamp } from "~/features/profiles/types";
import { Image } from "../Image";
import { MISSIONS_LIST } from "~/features/missions/missions";

interface Props {
  stamps: Array<Stamp>;
}

const ITEM_WIDTH = 118;

// overflow-x: auto; */
//     /* scroll-snap-type: x mandatory; */
//     /* scroll-behavior: smooth; */
//     -webkit-overflow-scrolling: touch;

export const MissionsCarrousel = ({ stamps }: Props) => {
  const missionsMapById = new Map(
    MISSIONS_LIST.map((mission) => [mission.id, mission])
  );

  const initialTranslateX = (3 * ITEM_WIDTH) / 4 + 12;

  return (
    <section className="my-3 text-center">
      <h3 className="font-crux text-xl leading-5">Seus selos</h3>

      <article className="relative my-3 h-28 w-full">
        <div
          className="absolute flex h-full gap-3"
          style={{
            transform: `translateX(-${initialTranslateX}px)`,
          }}
        >
          {stamps.map((stamp) => {
            const mission = missionsMapById.get(stamp.id);

            if (!mission) {
              return null;
            }

            return (
              <div
                key={stamp.id}
                className={`flex h-full w-[${ITEM_WIDTH}px] flex-col items-center justify-center gap-3 rounded-lg border-2 border-black`}
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
