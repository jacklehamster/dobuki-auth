// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { signIn } from "dobuki-auth";

const isDev = location.host !== "auth.dobuki.net";

signIn(isDev).onLoggedIn((auth) => {
  console.log("User logged in:", auth);
});
