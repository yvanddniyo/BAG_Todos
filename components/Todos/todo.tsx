"use client";

import { Checkbox } from "../ui/checkbox";
import { DeleteAlert } from "../shadcn/deleteModal";
import { UpdateAlert } from "../shadcn/updateModal";
import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteTodos,
  fetchTodos,
  toggleTodos,
  updateTodos,
} from "../../utils/todosApi";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import Loader from "../shadcn/Loader";
import {
  useDeleteTodos,
  useFetchTodos,
  useToggleTodos,
  useUpdateTodos,
} from "../../hooks/useTodosHooks";

export default function Todo() {
  const [id, setId] = useState<number | null>(null);
  const [idUpdate, setIdUpdate] = useState<number | null>(null);
  const [toggle, setToggle] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useFetchTodos();
  const deleteMutation = useDeleteTodos();
  const updatedMutation = useUpdateTodos();
  const toggleMutation = useToggleTodos();

  const sortedData = data?.todos.sort((a: any, b: any) => {
    return a.done === b.done ? 0 : a.done ? 1 : -1;
  });

  const handleDelete = (id: number) => {
    setId(id);
    deleteMutation.mutate(id, {
      onSettled: () => {
        setId(null);
      },
    });
  };

  const handleUpdate = (
    id: number,
    updatedData: { title?: string; description?: string }
  ) => {
    setIdUpdate(id);
    updatedMutation.mutate(
      { id, data: updatedData },
      {
        onSettled: () => {
          setIdUpdate(null);
        },
      }
    );
  };

  const handleToggle = (id: number, done: boolean) => {
    setToggle(id);
    toggleMutation.mutate(
      { id, toggle: { done: !done } },
      {
        onSettled: () => {
          setToggle(null);
        },
      }
    );
  };

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className="md:w-[50%] mx-auto bg-slate-700 flex items-center justify-center py-2 rounded-md">
        <h1>Unknown error occured, Please try again</h1>
      </div>
    );

  return (
    <>
      {sortedData.length === 0 ? (
        <div className="md:w-[50%] mx-auto flex flex-col items-center justify-center py-2 rounded-md">
          <h1>Oops You've no todos yet 😞</h1>
        </div>
      ) : (
        sortedData.map((item: any) => (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={item.id}
            className="w-full flex justify-center items-center mt-4"
          >
            <div
              className={`md:w-[50%] border-[0.1px] shadow-lg flex items-center justify-between gap-6 md:px-8 px-1 py-4 rounded-lg ${
                item.done ? "bg-slate-800" : ""
              }`}
            >
              <div>
                {toggleMutation.isPending && toggle === item.id ? (
                  "..."
                ) : (
                  <Checkbox
                    checked={item.done}
                    onCheckedChange={() => handleToggle(item.id, item.done)}
                  />
                )}
              </div>
              <div className="flex-1">
                <h3
                  className={`text-center text-lg font-bold ${
                    item.done ? "line-through" : ""
                  }`}
                  style={{
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className={`md:text-[14px] text-[12px] text-left ${
                    item.done ? "line-through" : ""
                  }`}
                  style={{
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {item.description}
                </p>
                <p className="text-xs text-gray-500 text-left pt-6 pb-1">
                  {moment(item.createdAt).format("MMMM D, YYYY h:mm A")}
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="text-3xl cursor-pointer hover:text-blue-500 transition-all duration-300">
                  <UpdateAlert
                    disables={item.done}
                    todo={item}
                    onUpdate={(updatedData: any) =>
                      handleUpdate(item.id, updatedData)
                    }
                    isLoading={idUpdate === item.id}
                  />
                </div>
                <div className="text-3xl cursor-pointer hover:text-red-500 transition-all duration-300">
                  <DeleteAlert
                    onDelete={() => handleDelete(item.id)}
                    isLoading={id === item.id}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))
      )}
      <ToastContainer />
    </>
  );
}
