import { json, redirect } from "@remix-run/node";
import { Form, useSubmit } from "@remix-run/react";
import { signInWithGitHub, getIdToken } from "~/models/auth.client";
import {
  commitSession,
  createUserSession,
  destroySession,
  getSession,
} from "~/models/session.server";
import { Button } from "~/components";

export async function loader({ request }: any) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("token")) {
    return redirect(process.env.HOME_URL);
  }

  return json(
    { error: session.get("error") },
    {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    }
  );
}

export async function action({ request }: { request: Request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const params = await request.formData();
  const idToken = params.get("idToken") || "";

  try {
    return createUserSession(request, idToken as string);
  } catch (e) {
    if (e instanceof Error) {
      session.flash("error", e.message);
    }

    return redirect(process.env.LOGIN_URL, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
}

export default function Index() {
  const submit = useSubmit();

  const signIn = async () => {
    await signInWithGitHub();

    const idToken = (await getIdToken()) as string;

    submit({ idToken: idToken }, { method: "post" });
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Form onSubmit={signIn}>
        <Button type="submit">Entrar com Github</Button>
      </Form>
    </main>
  );
}
