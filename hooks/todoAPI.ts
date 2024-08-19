import { TodoType } from "@/lib/types/todoTypes";
import axios from "axios"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export const fetchTodos = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/todos`);
    return data;
  };

export const  createTodos = async(dataForm: TodoType) => {
    const { data } = await axios.post(`${BASE_URL}/api/todos`, dataForm)
    return data;
}

export const deleteTodos = async(id: number) => {
    const todo = await axios.delete(`${BASE_URL}/api/todos/${id}`)
    return todo;
}

export const updateTodos = async (id: number, updatedData: { title?: string; description?: string }) => {
    const response = await axios.patch(`${BASE_URL}/api/todos/${id}`, updatedData);
    return response.data;
};

export const toggleTodos = async (id: number, toggle:{done: boolean}) => {
    const response = await axios.put(`${BASE_URL}/api/todos/${id}`, toggle);
    return response;
}