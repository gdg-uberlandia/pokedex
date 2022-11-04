/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOME_URL: string;
      LOGIN_URL: string;
      LOGOUT_URL: string;
      PROFILE_URL: string;
    }
  }
}

export {};
