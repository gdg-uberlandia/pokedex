import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "~/styles/tailwind.css";
import globalStylesheetUrl from "~/styles/globals.css";
import { Logo } from "./components";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: globalStylesheetUrl },
    {
      rel: "icon",
      href: "/favicon.svg",
      type: "image/svg+xml",
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Pokédex",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <span className="fixed inset-0 z-[-1] bg-blue-800 bg-game-pattern mix-blend-multiply"></span>
        <main className="relative m-auto min-h-screen max-w-[320px] pt-7">
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
