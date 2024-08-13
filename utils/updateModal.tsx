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
import { CiEdit } from "react-icons/ci"
import { MdDelete } from "react-icons/md"
  
  export function UpdateAlert() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
         {/* <Button><CiEdit  /></Button> */}
         <Button>Update</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader  className="my-4">
            <AlertDialogTitle>Update the task</AlertDialogTitle>
            <AlertDialogDescription>
              <Input type='text'/>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 text-red-500">Save changes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  