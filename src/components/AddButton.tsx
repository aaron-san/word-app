import clsx from "clsx";
import React from "react";

interface AddButtonProps {
  addWordHandler: () => void;
  disabled: boolean;
}

const AddButton: React.FC<AddButtonProps> = ({ addWordHandler, disabled }) => {
  return (
    <button
      className={clsx(
        'px-2 py-2 mr-2 shadow-md text-lg hover:rounded-full transition-[border-radius] duration-500 ease-in-out border',
        {"bg-gray-300 rounded-full border-slate-600 shadow-none text-gray-400": disabled},
      {"border-2 border-white rounded-2xl bg-cyan-100 text-slate-600": !disabled})}
    
      onClick={addWordHandler}
      disabled={disabled}
    >
      Add
    </button>
  );
};

export default AddButton;
