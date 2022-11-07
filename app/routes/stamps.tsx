import { redirect } from "@remix-run/node";
import { ROUTES } from "~/utils/routes";

export function loader() {
  return redirect(ROUTES.LOGIN);
}
