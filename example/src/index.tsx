// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import auth from "dobuki-auth";

auth.onLoggedIn((auth) => {
  console.log("User logged in:", auth);
});
