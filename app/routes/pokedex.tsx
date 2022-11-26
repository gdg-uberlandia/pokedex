import { Link, NavLink, Outlet } from "@remix-run/react";
import { Button, Card } from "~/components";
import { ROUTES } from "~/utils/routes";

export default function Pokedex() {
  return (<>
    <Card style={{ paddingBottom: '30px' }} title="Pokédex">
      <div className="mb-4 flex w-full">
        <NavLink className="w-full" to="/pokedex/people">
          {({ isActive }) => (
            <Button
              active={isActive}
              className="rounded-r-none border-r-[1px]"
              disabled={isActive}
              full
            >
              Pessoas
            </Button>
          )}
        </NavLink>
        <NavLink className="w-full" to="/pokedex/companies">
          {({ isActive }) => (
            <Button
              active={isActive}
              className="rounded-l-none border-l-[1px]"
              disabled={isActive}
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
      <Button
        className="mb-4"
        primary
        full
      >
        Ir para Home
      </Button>
    </Link>
  </>
  );
}
