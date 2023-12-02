import { Link, NavLink, Outlet } from "@remix-run/react";
import { Button, Card } from "~/components";
import { ROUTES } from "~/utils/routes";

export default function Pokedex() {
  return (
    <>
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

      <Link to={ROUTES.HOME}>
        <Button className="mb-4" primary full>
          Ir para Home
        </Button>
      </Link>
    </>
  );
}
