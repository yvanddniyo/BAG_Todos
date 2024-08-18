'use server'
import { Dark } from "@/app/ui/darkMode/darkMode";
import { addTodo, getData } from "@/lib/actions/todoActions";
import AddTodo from "@/lib/components/addTodo";
import Todo from "@/lib/components/todo";
import 'react-toastify/dist/ReactToastify.css';
import { todoType } from "@/lib/types/todoTypes";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function page (){
  const session:any = await auth()
  if (!session?.user) {
    redirect("/api/auth/signin")
  }  
 return(
   <main className="w-full md:px-12 py-12 px-3">
      <Dark 
       session = {session?.user}
      />
      <AddTodo />
      <Todo /> 
   </main>
 )
}