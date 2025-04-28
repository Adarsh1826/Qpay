"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { AppBar } from "@repo/ui/appbar";

export default function Page() {
  const session = useSession();
  return (
   <div>
      <AppBar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
   </div>
  );
}