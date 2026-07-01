import React from "react";
 
const DeleteModal = ({ isOpen, onClose, onConfirm,alertMessage="Are you sure you want to delete?" }) => {
  if (!isOpen) return null;
 
  return (
<div
      className="w-full mx-auto fixed inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center transition-opacity duration-200"
      role="presentation"
>
<div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md">
        {/* Modal Header */}
<h2 className="text-lg font-semibold text-gray-900">Delete</h2>
 
        {/* Modal Body */}
<p className="text-sm text-gray-700 mt-2">
         {alertMessage}
</p>
 
        {/* Modal Footer */}
<div className="flex justify-end space-x-4 mt-4">
<button
            className="px-4 py-2 cursor-pointer bg-red-500 text-white font-bold rounded-lg shadow hover:bg-red-600 transition"
            onClick={onConfirm}
>
            Delete
</button>
<button
            className="px-4 py-2 border cursor-pointer border-gray-300 text-gray-900 font-bold rounded-lg shadow hover:bg-gray-100 transition"
            onClick={onClose}
>
            Cancel
</button>
</div>
</div>
</div>
  );
};
 
export default DeleteModal;