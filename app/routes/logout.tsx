import { redirect } from "@remix-run/node";
import { logout } from "~/models/user.server";

export const action = async ({ request }: { request: Request }) => {
  return logout(request);
};

export const loader = async () => {
  return redirect(process.env.LOGIN_URL);
};
