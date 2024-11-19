import React from "react";
import {Button} from "@mui/material"


type Props = {
    isOpen: boolean;
    text: string;
    onClose: () => void;
    handler: () => void;
}

const Modal = ({ isOpen, text, onClose, handler }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-120 px-6 py-8">
        <div className="text-black w-full items-center mb-4">
            {text}
        </div>
        <div className="flex wifull justify-center gap-2">
            <Button className='bg-red-500 hover:bg-red-400 text-white' onClick={onClose}>Close</Button>
            <Button className='bg-green-500 hover:bg-green-400 text-white' onClick={handler}>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;