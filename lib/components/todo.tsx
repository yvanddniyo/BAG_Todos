"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DeleteAlert } from "@/utils/deleteModal";
import { UpdateAlert } from "@/utils/updateModal";
import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteTodos, fetchTodos, toggleTodos, updateTodos } from "@/hooks/todoAPI";
import moment from 'moment'
import { ToastContainer, toast } from "react-toastify"
import { useState } from "react";

export default function Todo() {
  const [id, setId] = useState<number | null>(null)
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success("Todo successfully deleted 😅")
    },
  });

  const handleDelete = (id: number) => {
    setId(id)
    deleteMutation.mutate(id,  {
      onSettled: () => {
        setId(null);
      }});
    
  };

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { title?: string; description?: string } }) =>
      updateTodos(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
      toast.success("Todo successfully updated 😅")
    }
  })

  const handleUpdate = (id: number, updatedData: { title?: string; description?: string }) => {
    setId(id)
    updateMutation.mutate({ id, data: updatedData }, {
      onSettled: () => {
        setId(null)
    }});
  };

  const toggleMutation = useMutation({
    mutationFn: ({ id, toggle }: {
      id: number;
      toggle: { done: boolean }
    }) =>
      toggleTodos(id, toggle),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
      toast.success("Todo successfully toggled 😅")
    }
  })

  const handleToggle = (id: number, done: boolean) => {
    toggleMutation.mutate({ id, toggle: { done: !done } });
  }

  if (isLoading) return <div className="flex justify-center">Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {data?.todos?.map((item: any) => (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          key={item.id}
          className="w-full flex justify-center items-center mt-4"
        >
          <div className={`md:w-[50%] border-[0.1px] shadow-lg flex items-center justify-between gap-6 md:px-8 px-1 pt-4 rounded-lg ${item.done ? 'bg-slate-800 ' : ''}`}>
            <div>
              <Checkbox
                checked={item.done}
                onCheckedChange={() => handleToggle(item.id, item.done)}
              />
            </div>
            <div>
              <h3 className={`text-center text-lg font-bold ${item.done ? 'line-through' : ''}`}>{item.title}</h3>
              <p className={`md:text-[14px] text-[12px] text-center ${item.done ? 'line-through' : ''}`}>
                {item.description}
              </p>
              <p className="text-xs text-gray-500 text-left pt-6 pb-1">
                Created at: {moment(item.createdAt).format('MMMM D, YYYY h:mm A')}
              </p>
            </div>
            <div className="flex md:flex-row flex-col items-center gap-3">
              <div className="text-3xl cursor-pointer hover:text-blue-500 transition-all duration-300">
                <UpdateAlert
                  disables = {item.done}
                  todo={item}
                  onUpdate={(updatedData: any) => handleUpdate(item.id, updatedData)}
                  isLoading={id === item.id}
                />
              </div>
              <div className="text-3xl cursor-pointer hover:text-red-500 transition-all duration-300">
                {<DeleteAlert
                  onDelete={() => handleDelete(item.id)}
                  isLoading={id === item.id}
                />}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
      <ToastContainer />
    </>
  );
}