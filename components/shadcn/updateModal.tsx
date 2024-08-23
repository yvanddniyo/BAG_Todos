//@ts-nocheck
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from '../ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { todoSchema } from './todoSchema';
import { useFetchTodos } from '@/hooks/useTodosHooks';

interface UpdateAlertProps {
  todo: { id: number; title: string; description: string };
  disables: { done: boolean };
  onUpdate: (updatedData: { title: string; description: string }) => void;
  isLoading: boolean;
}

export function UpdateAlert({ todo, onUpdate, isLoading }: UpdateAlertProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: todo.title || "",
      description: todo.description || "",
    },
  });

  const watchedTitle = useWatch({ control, name: 'title' });
  const watchedDescription = useWatch({ control, name: 'description' });

  const isSaveDisabled = !watchedTitle.trim() || !watchedDescription.trim();
 

  const handleUpdate = (data: { title: string; description: string }) => {
    onUpdate(data);
    setIsOpen(false);
  };
  
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} 
        disabled={isLoading || todo.done}>
          {isLoading ? 'Updating...' : 'Update'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <AlertDialogHeader className="my-4">
            <AlertDialogTitle>Update the task</AlertDialogTitle>
            <AlertDialogDescription style={{ display: 'flex', flexDirection: "column", gap: "8px" }}>
              <Label>Title</Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input 
                    type="text" 
                    {...field} 
                    isInvalid={!!errors.title}
                    placeholder="Enter the title"
                  />
                )}
              />
              {errors.title && <span className="text-red-500">{errors.title.message}</span>}
              
              <Label>Description</Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea 
                    {...field} 
                    isInvalid={!!errors.description}
                    placeholder="Enter the description"
                  />
                )}
              />
              {errors.description && <span className="text-red-500">{errors.description.message}</span>}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              as="button"
              type="submit"
              disabled={isLoading || isSaveDisabled}
            >
              {isLoading ? 'Saving...' : 'Save changes'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
