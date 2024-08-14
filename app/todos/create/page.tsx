'use server'
import { Dark } from "@/app/ui/darkMode/darkMode";
import { addTodo, getData } from "@/lib/actions/todoActions";
import AddTodo from "@/lib/components/addTodo";
import Todo from "@/lib/components/todo";
import 'react-toastify/dist/ReactToastify.css';
import { todoType } from "@/lib/types/todoTypes";

export default async function page (){
  const data = await getData();
  console.log('Data:', data);
  
 return(
   <main className="w-full md:px-12 py-12 px-3">
       <Dark />
      <AddTodo />
      {/* @ts-ignore */}
      <Todo /> 
   </main>
 )
}