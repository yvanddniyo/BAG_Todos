"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createTodos } from "@/hooks/todoAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoSchema } from "@/utils/todoSchema";
import { fetchTodos } from "@/hooks/todoAPI";

export default function AddTodo() {
  const queryClient = useQueryClient();
  //@ts-ignore
  const { data: todos } = fetchTodos();

  const { mutate, isPending } = useMutation({
    mutationFn: createTodos,
    onSuccess: () => {
      //@ts-ignore
      queryClient.invalidateQueries("todos");
    },
  });

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
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col">
        <h1 className="pt-20 text-center pb-6 text-gray-500 font-[800] text-2xl">
          Todo List
        </h1>
      </div>
      <form
        className="flex flex-col justify-center items-center gap-6 mb-12"
        onSubmit={handleSubmit(onCreateTodo)}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              placeholder="Title"
              className="md:w-[40%] mx-4 outline-none shadow-md px-2 border rounded"
              {...field}
            />
          )}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              placeholder="Description"
              className="md:w-[40%] mx-4 outline-none shadow-md px-2 border rounded"
              {...field}
            />
          )}
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
        <Button className="px-3" type="submit">
          {isPending ? "Adding..." : "Add a Task"}
        </Button>
      </form>
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
