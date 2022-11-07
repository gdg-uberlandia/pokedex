/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

declare global {
  interface Window {
    ENV: any;
  }
  namespace NodeJS {
    interface ProcessEnv {
      HOME_URL: string;
      LOGIN_URL: string;
      LOGOUT_URL: string;
      POKEDEX_URL: string;
      POKEDEX_PEOPLE_URL: string;
      POKEDEX_COMPANIES_URL: string;
    }
  }
}

export { };
