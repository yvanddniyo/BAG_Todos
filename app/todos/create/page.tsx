'use client'
import ThemeSwitch from "@/app/components/ThemeToggle";
import { motion } from "framer-motion";

export default async function page (){
 return(
   <main className="w-full md:px-12 py-12 px-3">
      <div className="flex items-center justify-between">
      <h3 className="md:text-3xl text-2xl">
           ToDo
          <span className="text-orange-600 font-[700] drop-shadow">
            app
          </span>{" "}
        </h3>
         <motion.span 
         initial={{ y: -50, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 0.5 }}
         className="md:text-3xl text-2xl cursor-pointer bg-slate-500 py-2 px-8 rounded-full">
          <ThemeSwitch  />
         </motion.span>
      </div>
   </main>
 )
}