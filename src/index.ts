// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

// const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const DEFAULT_CLERK_PUB_KEY = "pk_test_YWxsb3dlZC1iaXNvbi0yLmNsZXJrLmFjY291bnRzLmRldiQ";


import { Clerk } from "@clerk/clerk-js";

export async function signin(clerkPubKey = DEFAULT_CLERK_PUB_KEY) {
  const clerk = new Clerk(clerkPubKey);
  await clerk.load({
    // Set load options here
  });

  if (clerk.user) {
    const userButtonDiv = (document.getElementById('user-button') ?? (() => {
      const div = document.body.appendChild(document.createElement('div'));
      div.id = 'user-button';
      div.style.margin = '10px';
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
    //  Black translucent overlay
    const overlay = (document.getElementById('overlay') ?? (() => {
      const div = document.body.appendChild(document.createElement('div'));
      div.id = 'overlay';
      div.style.position = 'fixed';
      div.style.top = '0';
      div.style.left = '0';
      div.style.width = '100%';
      div.style.height = '100%';
      div.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      div.style.zIndex = '1000';
      //  blur
      div.style.backdropFilter = 'blur(10px)';
      return div;
    })()) as HTMLDivElement;

    const signInDiv = (document.getElementById('sign-in') ?? (() => {
      const div = overlay.appendChild(document.createElement('div'));
      div.id = 'sign-in';
      div.style.position = 'absolute';
      div.style.top = '50%';
      div.style.left = '50%';
      div.style.transform = 'translate(-50%, -50%)';
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
