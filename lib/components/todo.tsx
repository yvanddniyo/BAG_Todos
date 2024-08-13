"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DeleteAlert } from "@/utils/deleteModal";
import { UpdateAlert } from "@/utils/updateModal";
import { motion } from "framer-motion";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { todoType } from "../types/todoTypes";
import axios from "axios"
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { config } from "dotenv";
// import { baseUrl } from "@/hooks/todoAPI";
// import { fetchTodos } from "@/hooks/todoAPI";
// console.log(baseUrl);

const fetchTodos = async () => {
  const { data } = await axios.get('/api/todos');
  return data;
};

export default function Todo() {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });
  console.log("data", data);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
//   const { isPending, error, data } = useQuery({
    
//     queryKey: ['todos'],
//     queryFn: fetchTodos()
//   })


  return (
    <>
      {data.todos?.map((item: any) => (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          key={item.id}
          className="w-full flex justify-center items-center mt-4 "
        >
          <div
         
            className="border flex items-center justify-center gap-6 px-8 py-4 rounded-lg"
          >
            <div className="">
              <Checkbox />
            </div>
            <div className="">
              <h3 className="text-center text-lg font-bold">{item.title}</h3>
              <p className="md:text-[14px] text-[12px] text-center">
                {item.description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-3xl cursor-pointer  hover:text-blue-500 transition-all duration-300">
                <UpdateAlert />
              </div>
              <div className="text-3xl cursor-pointer hover:text-red-500 transition-all duration-300">
                <DeleteAlert />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}
function useClient(arg0: { queryKey: string[]; }) {
  throw new Error("Function not implemented.");
}

// function useQuery(arg0: { queryKey: string[]; queryFn: () => Promise<any>; }): { data: any; error: any; isLoading: any; } {
//   throw new Error("Function not implemented.");
// }

