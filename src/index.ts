// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

// const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const DEFAULT_CLERK_PUB_KEY_DEV = "pk_test_YWxsb3dlZC1iaXNvbi0yLmNsZXJrLmFjY291bnRzLmRldiQ";
const DEFAULT_CLERK_PUB_KEY_PROD = "pk_live_Y2xlcmsuZG9idWtpLm5ldCQ";
const DEFAULT_CLERK_PUB_KEY = DEFAULT_CLERK_PUB_KEY_PROD;

import { Clerk } from "@clerk/clerk-js";
import { UserResource } from "@clerk/types";

const onLoginListener = new Set<(auth: Auth) => void>;
const onLogOutListener = new Set<() => void>;

interface Auth {
  id?: UserResource["id"];
  emailAddresses?: UserResource["emailAddresses"];
  firstName?: UserResource["firstName"];
  lastName?: UserResource["lastName"];
  sessionToken?: string;
  readonly onLoggedIn: (listener: (auth: Auth) => void) => void;
  readonly onLoggedOut: (listener: () => void) => void;
}

// default export auth
const auth: Auth = {
  onLoggedIn: (listener: (auth: Auth) => void) => {
    onLoginListener.add(listener);
  },
  onLoggedOut: (listener: () => void) => {
    onLogOutListener.add(listener);
  },
};

async function signin(clerkPubKey = DEFAULT_CLERK_PUB_KEY) {
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

    const sessionToken = await clerk.session?.getToken() ?? undefined;
    if (!sessionToken) {
      console.error("No session token found. User is not authenticated.");
    } else {
      console.log("Session token:", sessionToken.substring(0, 10) + "...");
    }
    auth.sessionToken = sessionToken;
    auth.id = id;
    auth.emailAddresses = emailAddresses;
    auth.firstName = firstName;
    auth.lastName = lastName;

    if (sessionToken) {
      onLoginListener.forEach((listener) => listener(auth));
    } else {
      onLogOutListener.forEach((listener) => listener());
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

export function signIn(dev = false) {
  signin(dev ? DEFAULT_CLERK_PUB_KEY_DEV : DEFAULT_CLERK_PUB_KEY_PROD);
  return auth;
}
