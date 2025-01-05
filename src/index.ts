// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />


import { Clerk } from "@clerk/clerk-js";

// const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerkPubKey = "pk_test_YWxsb3dlZC1iaXNvbi0yLmNsZXJrLmFjY291bnRzLmRldiQ";

export async function signin() {
  const clerk = new Clerk(clerkPubKey!);
  await clerk.load({
    // Set load options here
  });

  if (clerk.user) {
    const userButtonDiv = (document.getElementById('user-button') ?? (() => {
      const div = document.body.appendChild(document.createElement('div'));
      div.id = 'user-button';
      return div;
    })()) as HTMLDivElement;

    clerk.mountUserButton(userButtonDiv)
  } else {
    const signInDiv = (document.getElementById('sign-in') ?? (() => {
      const div = document.body.appendChild(document.createElement('div'));
      div.id = 'sign-in';
      return div;
    })()) as HTMLDivElement;

    clerk.mountSignIn(signInDiv)
  }
}

signin();
