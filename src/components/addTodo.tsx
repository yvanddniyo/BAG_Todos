"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const AddTodo = () => {
  
  return (
    <>
    <h1 className="pt-20 text-center pb-6 text-gray-500 font-[800] text-2xl">Todo List</h1>
     <div className="w-full flex justify-center gap-6">
     <Input type="text" placeholder="Add a Task" 
     className="md:w-[60%] mx-4 outline-none shadow-md p-2 border rounded"
     />
     <Button className="px-3">Add</Button>
     </div>
    </>
  )
}

export default AddTodo