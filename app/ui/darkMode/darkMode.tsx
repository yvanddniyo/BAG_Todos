'use client';

import ThemeSwitch from "@/app/components/ThemeToggle";
import { handleSignOut } from "@/app/serverAction";
import { DropdownMenuRadioGroupDemo } from "@/utils/Profile";
import { motion } from "framer-motion";
import Link from "next/link";
import { SlLogout } from "react-icons/sl";

interface Session {
  image: string;
  name: string;
  email: string;
}

interface DarkProps {
  session: Session;
}

export const Dark = ({ session }: DarkProps) => {
  return (
    <motion.div 
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="w-full fixed top-6 left-0 flex items-center justify-between px-4 py-2 mx-auto">
      <Link href={"/"}>
        <h3 className="md:text-3xl text-2xl">
          Todo-
          <span className="text-orange-600 font-[700] drop-shadow">
            app
          </span>{" "}
        </h3>
      </Link>
      <div
      className="flex items-center gap-4 cursor-pointer">
        <span 
      
          className="md:text-3xl text-2xl cursor-pointer py-2 px-8 rounded-full"
        >
          <ThemeSwitch />
        </span>
        <form 
        
        action={handleSignOut}>
          <DropdownMenuRadioGroupDemo session={session} />
        </form>
      </div>
    </motion.div>
  );
}
