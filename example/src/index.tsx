// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "dobuki-auth";

const div = document.body.appendChild(document.createElement("div"));


//  HelloComponent
const root = createRoot(div);
root.render(
  <StrictMode>
    {/* <input type="button" value="Signup" onClick={() => {
      signup();
    }} /> */}
    {/* <input type="button" value="Signin" onClick={() => {
      signin();
    }} /> */}
    {/* <input type="button" value="Signin UI" onClick={() => {
      loginUI();
    }} /> */}

  </StrictMode>
);
