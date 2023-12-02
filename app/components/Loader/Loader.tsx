import Pokeball from "~/assets/images/pokeball.png";
import { Image } from "~/components";

export function Loader() {
  return (
    <>
      <span className="fixed inset-0 h-full w-full bg-white opacity-50"></span>
      <figure className="fixed inset-0 flex h-full w-full items-center justify-center">
        <Image
          src={Pokeball}
          alt="Carregando a página"
          className="w-[25px]	animate-spin-slow"
        />
      </figure>
    </>
  );
}
