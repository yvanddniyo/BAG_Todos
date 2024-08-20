import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(4, "Title must have 4 characters above")
  .max(10, "Title must not exceed 10 characters"),
  description: z.string().min(10, "Description must have 4 characters above")
});

export type TodoSchema = z.infer<typeof todoSchema>;
