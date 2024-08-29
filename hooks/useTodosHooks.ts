import {
  createTodos,
  deleteTodos,
  fetchTodos,
  toggleTodos,
  updateTodos,
} from "../utils/fetchApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useFetchTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
};

export const useCreateTodos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodos,
    onSuccess: () => {
      //@ts-ignore
      queryClient.invalidateQueries("todos");
    },
  });
};

export const useDeleteTodos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo successfully deleted 😅");
    },
  });
};

export const useUpdateTodos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: { title?: string; description?: string };
    }) => {
      try {
        return await updateTodos(id, data);
      } catch (error:any) {
        toast.error(`Error: ${error.message}`);
        throw new Error('Failed to update todo');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
      toast.success("Todo successfully updated 😅");
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};


export const useToggleTodos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, toggle }: { id: number; toggle: { done: boolean } }) =>
      toggleTodos(id, toggle),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
      if(variables.toggle.done){
        toast.success("Todo is completed 😅");
      }
      else{
        toast.success("Todo is not completed 😥");
      }
    },
  });
};
