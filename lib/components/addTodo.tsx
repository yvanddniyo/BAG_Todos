"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useFormState } from "react-dom"
import { addTodo } from "../actions/todoActions"

export default function AddTodo () {
  // const [state, formAction] = useFormState(addTodo)
  
  return (
    <>
    <div className="w-full flex justify-center items-center flex-col">
      <h1 className="pt-20 text-center pb-6 text-gray-500 font-[800] text-2xl">Todo List</h1>
    </div>
     <form className="flex flex-col justify-center items-center gap-6 mb-12">
     <Input type="text" placeholder="Title" 
     className="md:w-[40%] mx-4 outline-none shadow-md p-2 border rounded"
     />
     <Textarea  placeholder="Description" 
     className="md:w-[40%] mx-4 outline-none shadow-md p-2 border rounded"
     />
     <Button className="px-3">Add a Task</Button>
     </form>
    </>
  )
}

