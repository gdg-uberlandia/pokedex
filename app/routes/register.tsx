import { json, redirect } from "@remix-run/node";
import { Form, useSubmit } from "@remix-run/react";
import {
  signInWithGitHub,
  signInWithGoogle,
  getIdToken,
} from "~/models/auth.client";
import {
  commitSession,
  createUserSession,
  getSession,
  destroySession,
} from "~/features/users/session.server";
import { Button } from "~/components";
import { syncProfile } from "~/features/users/user.server";
import { ROUTES } from "~/utils/routes";
import type { User } from "firebase/auth";

export async function loader({ request }: any) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("token")) {
    return redirect(ROUTES.HOME);
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
  const user: User = JSON.parse(params.get("user") as string) || {};

  try {
    await syncProfile(request, {
      userId: user.uid,
      email: user.email,
      photoUrl: user.photoURL,
      name: user.displayName,
    });
    return createUserSession(request, idToken as string, user.uid);
  } catch (e) {
    if (e instanceof Error) {
      session.flash("error", e.message);
    }

    return redirect(ROUTES.LOGIN, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
}

export default function Index() {
  const submit = useSubmit();

  const _signInWithGitHub = async () => {
    //TODO: verificar se ja tem um codigo na Url caso não abrir poup-up
    const user = await signInWithGitHub();

    const idToken = (await getIdToken()) as string;

    submit({ idToken, user: JSON.stringify(user.user) }, { method: "post" });
  };

  const _signInWithGoogle = async () => {
    const user = await signInWithGoogle();

    const idToken = (await getIdToken()) as string;

    submit({ idToken, user: JSON.stringify(user.user) }, { method: "post" });
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="row-auto ">
        <Form onSubmit={_signInWithGitHub}>
          <Button type="submit">Registrar com Github</Button>
        </Form>
        <Form onSubmit={_signInWithGoogle} style={{ marginTop: "10px" }}>
          <Button type="submit">Registrar com Google</Button>
        </Form>
      </div>
    </main>
  );
}
