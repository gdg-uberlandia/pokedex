import { NavLink, Outlet } from "@remix-run/react";
import { Button, Card } from "~/components";

export default function Pokedex() {
  return (
    <Card title="Pokédex">
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
  );
}
