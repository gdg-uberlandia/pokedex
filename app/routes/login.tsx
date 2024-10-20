import { json, redirect } from "@remix-run/node";
import { Form, useSubmit, useTransition } from "@remix-run/react";
import { toast } from "react-toastify";
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
import { Button, Image, Loader } from "~/components";
import { ROUTES } from "~/utils/routes";
import type { User } from "firebase/auth";
import { registerProfile } from "~/features/profiles/profile.server";
import Android from "~/assets/images/abductted-dino.png";

export async function loader({ request }: any) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("token")) {
    return redirect(ROUTES.HOME);
  }


  const error = session.get("error");
  return json(
    { error, },
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
    const _profile: any = await registerProfile({
      userId: user.uid,
      email: user.email!,
      photoUrl: user.photoURL,
      name: user.displayName!,
    });

    return createUserSession({
      idToken: idToken as string,
      userId: _profile.id,
    });
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
  const { state } = useTransition();

  const _signInWithGitHub = async () => {
    try {
      const user = await signInWithGitHub();
      const idToken = (await getIdToken()) as string;

      submit({ idToken, user: JSON.stringify(user.user) }, { method: "post" });
    } catch (error) {
      const parsedError = error as Error;
      if (
        parsedError?.message != null &&
        parsedError.message.includes(
          "account-exists-with-different-credential)"
        )
      ) {
        toast.error("Você fez login com outro provedor neste mesmo e-mail");
      }
    }
  };

  const _signInWithGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      const idToken = (await getIdToken()) as string;
      submit({ idToken, user: JSON.stringify(user.user) }, { method: "post" });
    } catch (error) {
      const parsedError = error as Error;
      if (
        parsedError?.message != null &&
        parsedError.message.includes(
          "account-exists-with-different-credential)"
        )
      ) {
        toast.error("Você fez login com outro provedor neste mesmo e-mail");
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center pt-12">
      {state === "loading" && <Loader />}

      <div className="row-auto">
        <Form onSubmit={_signInWithGitHub}>
          <Button type="submit" primary>
            Entrar com Github
          </Button>
        </Form>
        <Form onSubmit={_signInWithGoogle} style={{ marginTop: "10px" }}>
          <Button type="submit" primary>
            Entrar com Google
          </Button>
        </Form>
      </div>

      <Image
        src={Android}
        alt="Ash e seus Pokémons"
        className="fixed bottom-0 w-8/12 max-w-[200px]"
      />
    </main>
  );
}
