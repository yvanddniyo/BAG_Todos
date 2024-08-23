import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(4, "Title must have 4 characters above")
  .max(10, "Title must not exceed 10 characters"),
  description: z.string().min(6, "Description must have 6 characters above")
});

export const updateSchema = z.object({
  title: z.string().min(1, "Title is required")
  .max(10, "Title must not exceed 10 characters"),
  description: z.string().min(1, "Description is required")
})

export type TodoSchema = z.infer<typeof todoSchema>;
