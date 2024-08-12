"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DeleteAlert } from "@/utils/deleteModal";
import { UpdateAlert } from "@/utils/updateModal";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const Todo = () => {
    
  return (
    <>
      <div className="w-full flex justify-center mt-20">
        {
            <div className="flex items-center md:gap-16 gap-2 px-12 py-6 rounded-3xl border-[0.1px] border-gray-500">
            <div className="">
              <Checkbox />
            </div>
            <div className="">
              <p className="md:text-[14px] text-[12px] text-center">
                Wake up and running in morning 5km and return home
              </p>
            </div>
            <div className="flex items-center md:gap-8 gap-2">
              <div className="text-3xl cursor-pointer  hover:text-blue-500 transition-all duration-300">
                <UpdateAlert />
              </div>
              <div className="text-3xl cursor-pointer hover:text-red-500 transition-all duration-300">
                <DeleteAlert />
              </div>
            </div>
          </div>}
      </div>
    </>
  );
};

export default Todo;
