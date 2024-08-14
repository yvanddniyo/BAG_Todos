import { TodoType } from "@/lib/types/todoTypes";
import axios from "axios"

export const fetchTodos = async () => {
    const { data } = await axios.get('/api/todos');
    return data;
  };

export const  createTodos = async(dataForm: TodoType) => {
    const { data } = await axios.post('/api/todos', dataForm)
    return data;
}

export const deleteTodos = async(id: number) => {
    const todo = await axios.delete(`/api/todos/${id}`)
    return todo;
}

export const updateTodos = async (id: number, updatedData: { title?: string; description?: string }) => {
    const response = await axios.patch(`/api/todos/${id}`, updatedData);
    return response.data;
};

export const toggleTodos = async (id: number, toggle:{done: boolean}) => {
    const response = await axios.put(`/api/todos/${id}`, toggle);
    return response;
}