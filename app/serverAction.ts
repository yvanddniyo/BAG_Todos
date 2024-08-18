"use server";

import { signIn, signOut } from "@/auth"; 

export const   handleSignIn = async() => {
  await signIn("github", { redirectTo: "/todos/create" })
}

export const handleSignOut = async() => {
    await signOut({redirectTo: "/" });
};

export const handleSignInGoogle = async() => {
  await signIn("google", { redirectTo: "/todos/create" });
}
export const handleSignOutGoogle = async() => {
  await signOut({redirectTo: "/" });
}