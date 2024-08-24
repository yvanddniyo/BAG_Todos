"use client";

import { Lateef } from "next/font/google";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { handleSignIn, handleSignInGoogle } from "../utils/serverAction";


const lete = Lateef({
  subsets: ["latin"],
  weight: "600",
});

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <main
      className="bg-[#121212] min-h-[100vh] text-white relative overflow-hidden"
    >
      <div
        style={{
          position: "absolute",
          backgroundColor: "#f26d0f",
          borderRadius: "50%",
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: -30,
          top: -30,
          width: 60,
          height: 60,
          opacity: 0.75,
          pointerEvents: "none",
        }}
        className="flex justify-center items-center"
      >Hi</div>
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 1.1 }}
        className="flex justify-center md:pt-44 pt-24 flex-col items-center"
      >
        <h3 className="md:text-4xl text-2xl">
          Todo-<span className="text-orange-600 font-[700] drop-shadow">app</span>{" "}
        </h3>
        <p className={`md:text-3xl pt-4 text-center text-[23px] ${lete.className}`}>
          Where Passion match up with Dream
        </p>
      </motion.div>
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1.1 }}
        transition={{ ease: "easeInOut", duration: 1.1 }}
      >
        <div className="md:w-[60%] lg:w-[45%] flex justify-center md:mx-auto flex-col items-center border-[0.2px] mt-20 py-4 px-5 border-gray-500 rounded-lg mx-4">
          <div className="text-center">
            <h3 className="py-2 font-bold text-green-400">
              Keep Your Progress Grow
            </h3>
            <p className="py-3">
              Create your account and start your journey with best to do app
              which will help you to schedule and keep track every action you
              perform don't wait right time, the right time is now.
            </p>
          </div>
          <div className="flex md:flex-row items-center flex-col gap-6">
            <form
            action={handleSignInGoogle}
              className="flex  py-4"
            >
              <button
                type="submit"
                className="bg-orange-900 text-white rounded-lg py-2 px-4 hover:border-[0.1px] border-gray-500 flex items-center gap-1"
              >
                Sign Up with Google <FcGoogle />
              </button>
            </form>
            <form action={handleSignIn}>
            <button
                type="submit"
                className="bg-orange-900 text-white rounded-lg py-2 px-4 hover:border-[0.1px] border-gray-500 flex items-center gap-1"
              >
                Sign Up with GitHub <FaGithub />
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </main>
  );
}