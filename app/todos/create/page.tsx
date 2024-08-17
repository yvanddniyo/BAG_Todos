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
  const session = await auth()
  if (!session?.user) {
    redirect("/api/auth/signin")
  }
  
  const data = await getData();
  console.log('Data:', data);
  
 return(
  // <pre>
  //   {JSON.stringify(session, null, 2)}
  // </pre>
   <main className="w-full md:px-12 py-12 px-3">
      <Dark />
      <AddTodo />
      <Todo /> 
   </main>
 )
}