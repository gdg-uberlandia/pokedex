import {json, redirect } from "@remix-run/node";
import { Form, useSubmit } from "@remix-run/react";
import { signInWithGitHub, getIdToken } from "~/models/auth.client";
import {
  getSession,
  commitSession,
  createUserSession,
} from "~/sessions";

export async function loader({ request }: any) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("token")) {
    return redirect(process.env.PROFILE_URL || '/profile');
  }

  const data = { error: session.get("error") };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
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

    return redirect(process.env.LOGIN_URL || '/login', {
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
        <button className="rounded bg-cyan-900 p-1 text-white" type="submit">
          Login with Github
        </button>
      </Form>
    </main>
  );
}