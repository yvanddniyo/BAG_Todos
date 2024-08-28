"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import { todoSchema } from "../../utils/todoSchema";
import { createTodos, fetchTodos } from "../../utils/fetchApi";
import { useCreateTodos } from "@/hooks/useTodosHooks";

export default function AddTodo() {
  
  const queryClient = useQueryClient();
  //@ts-ignore
  const { data: todos } = fetchTodos();
  const createMutation = useCreateTodos()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onCreateTodo = (data: any) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col">
        <h1 className="pt-16 text-center pb-6 text-gray-500 font-[800] text-2xl">
        <TypeAnimation
      sequence={[
        'Todo-app first make it Work',
        2000, 
        'Todo-app first make it Good',
        2000,
        'Todo-app first make it Fast',
        2000,
        'Todo-app first make it Secure',
        2000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '1em', display: 'inline-block', color: "#db6d18" }}
      repeat={Infinity}
    />
        </h1>
      </div>
      <motion.form
       initial={{ x: 100, opacity: 0 }}
       animate={{ x: 0, opacity: 1 }}
       transition={{ duration: 0.5 }}
        className="flex flex-col justify-center items-center gap-4 mb-12"
        onSubmit={handleSubmit(onCreateTodo)}
      >
        <div className="w-full flex justify-center flex-col items-center">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                placeholder="Title"
                className="md:w-[50%] mx-4 outline-none shadow-md px-2 border rounded"
                {...field}
              />
            )}
          />
          {errors.title && <p className="text-red-500 text-left">{errors.title.message}</p>}
        </div>

        <div className="w-full flex justify-center flex-col items-center">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                placeholder="Description"
                className="md:w-[50%] mx-4 outline-none shadow-md px-2 border rounded"
                {...field}
              />
            )}
          />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
        </div>
        <div className="md:w-[40%] flex items-center justify-center gap-4">
          <Button className="px-3" type="submit"
          disabled={createMutation.isPending}
          >
            {createMutation.isPending ? "Adding..." : "Add a Task"}
          </Button>
        </div>
      </motion.form>
      <div>
        {todos?.map((todo: any) => (
          <div key={todo.id}>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
