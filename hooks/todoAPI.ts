import { config } from "dotenv";

export const fetchTodos =  () => {
   const datas=  fetch("/api/todos").then((res) => res.json());
   console.log("n/n/n/n",datas);
   return datas;
  };
  config({path: '.env'})

