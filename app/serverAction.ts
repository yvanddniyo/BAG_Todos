"use server";

import { signIn, signOut } from "@/auth"; 

export const   handleSignIn = async() => {
  await signIn("github", { redirectTo: "/todos/create" })
}

export const handleSignOut = async() => {
    await signOut({redirectTo: "/" });
};