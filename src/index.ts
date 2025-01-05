// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

// const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerkPubKey = "pk_test_YWxsb3dlZC1iaXNvbi0yLmNsZXJrLmFjY291bnRzLmRldiQ";


import { Clerk } from "@clerk/clerk-js";

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

    clerk.mountUserButton(userButtonDiv, {
      afterSignOutUrl: `${location.pathname}?goodbye=1`, // Redirect URL after sign-out
      signInUrl: `${location.pathname}?signin=1`, // Redirect URL after sign-in
      afterSwitchSessionUrl: `${location.pathname}?switched=1`, // Redirect URL after switching sessions
    })
    const { id, emailAddresses, firstName, lastName } = clerk.user;
    console.log(`User ID: ${id}`);
    console.log(`Email: ${emailAddresses.join(', ')}`);
    console.log(`Name: ${firstName} ${lastName}`);


    const sessionToken = await clerk.session?.getToken();
    if (!sessionToken) {
      console.error("No session token found. User is not authenticated.");
    } else {
      console.log("Session token:", sessionToken.substring(0, 10) + "...");
    }
  } else {
    const signInDiv = (document.getElementById('sign-in') ?? (() => {
      const div = document.body.appendChild(document.createElement('div'));
      div.id = 'sign-in';
      return div;
    })()) as HTMLDivElement;

    clerk.mountSignIn(signInDiv, {
      afterSignInUrl: `${location.pathname}?success=1`, // Redirect URL after successful sign-in
      afterSignUpUrl: `${location.pathname}?welcome=1`, // Redirect after sign-up
      afterSignOutUrl: `${location.pathname}?goodbye=1`, // Redirect URL after sign-out
    });
  }
}

signin();
