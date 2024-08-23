"use server";

import { signIn, signOut } from "../auth"; 

export const   handleSignIn = async() => {
  await signIn("github", { redirectTo: "/create" })
}

export const handleSignOut = async() => {
    await signOut({redirectTo: "/create" });
};

export const handleSignInGoogle = async() => {
  await signIn("google", { redirectTo: "/create" });
}
export const handleSignOutGoogle = async() => {
  await signOut({redirectTo: "/" });
}