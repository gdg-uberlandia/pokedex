import { Link } from "@remix-run/react";
import logoSymbol from "~/assets/images/logo.svg";
import { Image } from "~/components";

export function Logo() {
  return (
    <Link to="/">
      <figure className="mx-auto mb-7 flex h-9 w-full max-w-[260px] justify-center gap-3 rounded-full bg-white py-3">
        <Image src={logoSymbol} alt="Logo Devfest Triângulo 2023" />
        <h3 className="font-press text-[10px]">devfest triângulo 23</h3>
      </figure>
    </Link>
  );
}
