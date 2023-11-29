import { Link, useLocation, useNavigate } from "@remix-run/react";
import Logotype from "~/assets/images/logo.svg";
import Back from "~/assets/images/back.svg";
import { Image } from "~/components";
import { ROUTES } from "~/utils/routes";

export function Logo() {
  const { pathname, ...location } = useLocation();
  console.log("🚀 ~ Logo ~ location:", location);
  const navigate = useNavigate();

  // return (
  //   <Link to="/">
  //     <figure className="mx-auto mb-7 flex h-9 w-full max-w-[260px] justify-center gap-3 rounded-full bg-white py-3">
  //       <Image src={Logotype} alt="Logotipo Devfest Triângulo 2023" />
  //       <h3 className="whitespace-nowrap font-press text-[10px]">
  //         devfest triângulo
  //       </h3>
  //     </figure>
  //   </Link>
  // );

  return (
    <nav className="mx-auto mb-7 flex h-9 w-full items-center justify-center gap-3">
      {pathname !== ROUTES.PROFILE && (
        <button
          onClick={() => navigate(-1)}
          className="flex h-full w-12 items-center justify-center rounded-full bg-white"
        >
          <Image className="h-7" src={Back} alt="Voltar para página anterior" />
        </button>
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
