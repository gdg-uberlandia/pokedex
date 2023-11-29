import { Link } from "@remix-run/react";
import Logotype from "~/assets/images/logo.svg";
import { Image } from "~/components";

export function Logo() {
  return (
    <Link to="/">
      <figure className="mx-auto mb-7 flex h-9 w-full max-w-[260px] justify-center gap-3 rounded-full bg-white py-3">
        <Image src={Logotype} alt="Logotipo Devfest Triângulo 2023" />
        <h3 className="whitespace-nowrap font-press text-[10px]">
          devfest triângulo
        </h3>
      </figure>
    </Link>
  );
}
