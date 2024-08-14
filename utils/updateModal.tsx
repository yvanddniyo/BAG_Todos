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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea';

interface UpdateAlertProps {
  todo: { id: number; title: string; description: string };
  disables: {done: boolean}
  onUpdate: (updatedData: { title: string; description: string }) => void;
  isLoading: boolean;
}

export function UpdateAlert({ todo, onUpdate, isLoading }: UpdateAlertProps) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [isOpen, setIsOpen] = useState(false);

 const handleUpdate = () => {
  onUpdate({ title, description });
  setIsOpen(false);
};

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="my-4">
          <AlertDialogTitle>Update the task</AlertDialogTitle>
          <AlertDialogDescription style={{display: 'flex', flexDirection: "column", gap: "8px"}}>
            <Label>Title</Label>
            <Input 
              type='text' 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
            />
            <Label>Description</Label>
            <Textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            className="bg-blue-500 text-white"
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save changes'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}