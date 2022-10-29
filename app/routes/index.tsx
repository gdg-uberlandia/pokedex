import { redirect } from '@remix-run/node'

export function loader() {
  return redirect(process.env.LOGIN_URL || "/login");
}
