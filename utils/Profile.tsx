"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { handleSignIn } from "@/app/serverAction"

interface Session {
  image: string;
  name: string;
  email: string;
}

interface SessionDrop {
  session: Session;
}

export function DropdownMenuRadioGroupDemo({ session }: SessionDrop) {
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img
          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
          src={session.image}
          alt=""
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Your Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
        <label style={{paddingLeft: "10px", color: "#1f3434", fontWeight: "600"}}>Name</label>

          <DropdownMenuRadioItem value="top">{session.name}</DropdownMenuRadioItem>
          <label style={{paddingLeft: "10px", color: "#1f3434", fontWeight: "600"}}>Email</label>
          <DropdownMenuRadioItem value="bottom">{session.email}</DropdownMenuRadioItem>
          <form action={handleSignIn} className="">
            <label style={{paddingLeft: "10px", color: "#1f3434", fontWeight: "600"}}>Action</label>
            <DropdownMenuRadioItem value="right">
              <button type="submit">Logout</button>
            </DropdownMenuRadioItem>
          </form>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
