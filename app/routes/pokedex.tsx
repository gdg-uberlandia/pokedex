import { NavLink, Outlet, useTransition } from "@remix-run/react";
import { Button, Card, Loader } from "~/components";

export default function Pokedex() {
  const { state } = useTransition();

  return (
    <>
      {state === "loading" && <Loader />}

      <Card className="mb-16" title="Pokédex">
        <div className="mb-4 flex w-full">
          <NavLink className="w-full" to="/pokedex/people">
            {({ isActive }) => (
              <Button
                className={`rounded-r-none border-r-[1px] ${
                  isActive ? "!bg-black !text-white" : "!bg-white !text-black"
                }`}
                full
              >
                Pessoas
              </Button>
            )}
          </NavLink>
          <NavLink className="w-full" to="/pokedex/companies">
            {({ isActive }) => (
              <Button
                className={`rounded-l-none border-l-[1px] ${
                  isActive ? "!bg-black !text-white" : "!bg-white !text-black"
                }`}
                full
              >
                Empresas
              </Button>
            )}
          </NavLink>
        </div>

        <Outlet />
      </Card>
    </>
  );
}
