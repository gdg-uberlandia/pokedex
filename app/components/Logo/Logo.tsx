import { Link, useLocation } from "@remix-run/react";
import { get } from "lodash";
import Logotype from "~/assets/images/logo.svg";
import Back from "~/assets/images/back.svg";
import { Image } from "~/components";
import { ROUTES } from "~/utils/routes";

export function Logo() {
  const { pathname, ...location } = useLocation();
  const backTo = get(location, "state.backTo", "/");
  const renderGoBackButton = ![ROUTES.LOGIN, ROUTES.PROFILE].includes(pathname);

  return (
    <nav className="mx-auto mb-7 flex h-9 w-full items-center justify-center gap-3">
      {renderGoBackButton && (
        <Link
          to={backTo}
          className="flex h-full w-12 items-center justify-center rounded-full bg-white"
        >
          <Image className="h-7" src={Back} alt="Voltar para página anterior" />
        </Link>
      )}

      <Link
        to="/"
        className=" h-9 max-w-[240px] flex-grow gap-3 rounded-full bg-white py-3"
      >
        <figure className="flex justify-center gap-3">
          <Image src={Logotype} alt="Logotipo Devfest Triângulo 2023" />
          <h3 className="whitespace-nowrap font-press text-[10px]">
            devfest triângulo
          </h3>
        </figure>
      </Link>
    </nav>
  );
}
