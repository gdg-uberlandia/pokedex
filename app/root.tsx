import { json } from "@remix-run/node";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { ToastContainer } from "react-toastify";
import reactTostifyStylsheetUrl from "react-toastify/dist/ReactToastify.css";
import tailwindStylesheetUrl from "~/styles/tailwind.css";
import globalStylesheetUrl from "~/styles/globals.css";
import { Logo } from "~/components";
import { getBgColor } from "~/utils/root";

// Explicacao transmissão variaveis para o FRONT
//https://remix.run/docs/en/v1/guides/envvars

export async function loader() {
  return json({
    ENV: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    },
    bgColor: getBgColor(),
  });
}

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: globalStylesheetUrl },
    { rel: "stylesheet", href: reactTostifyStylsheetUrl },
    {
      rel: "icon",
      href: "/favicon.svg",
      type: "image/svg+xml",
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Devfest Triângulo 2023",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const { ENV, bgColor } = useLoaderData();

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <span
          className={`fixed inset-0 z-[-1] bg-game-pattern ${bgColor}`}
        ></span>
        <main className="relative m-auto min-h-screen max-w-[320px] p-1 pt-7">
          <ToastContainer />
          <Logo />
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </main>
      </body>
    </html>
  );
}
