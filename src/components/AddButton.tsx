import clsx from "clsx";
import React, { useContext } from "react";
import { MyGlobalContext } from "../App";

interface AddButtonProps {
  language: "english" | "japanese" | "spanish";
  addWordHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const AddButton: React.FC<AddButtonProps> = ({ language, addWordHandler }) => {
  const { languagesState } = useContext(MyGlobalContext);
  const { addWord, editWordMode } = languagesState[language];

  const disabled = addWord || editWordMode;
  return (
    <button
      className={clsx(
        "px-2 py-1 md:py-2 shadow-md md:text-lg hover:rounded-lg transition-[border-radius] duration-500 ease-in-out border",
        {
          "bg-gray-300 rounded-full border-slate-600 shadow-none text-gray-400":
            disabled,
        },
        {
          "border-2 border-white bg-cyan-100 text-slate-600": !disabled,
        }
      )}
      onClick={(e) => addWordHandler(e)}
      disabled={disabled}
    >
      Add
    </button>
  );
};

export default AddButton;
