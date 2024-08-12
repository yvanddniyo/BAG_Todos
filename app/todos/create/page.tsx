'use server'
import ThemeSwitch from "@/app/components/ThemeToggle";
import { Dark } from "@/app/ui/darkMode/darkMode";
import { getData } from "@/src/actions/todoActions";
import AddTodo from "@/src/components/addTodo";
import Todo from "@/src/components/todo";
import { todoType } from "@/src/types/todoTypes";

interface Props {
  todos: todoType[];
}
export default async function page (){
  const data = await getData()
  console.log(data);
  
 return(
   <main className="w-full md:px-12 py-12 px-3">
      <Dark />
      <AddTodo />
      {/* <Todos todos={[]} /> */}
      <Todo todo={data}/>
   </main>
 )
}