import React, { useContext } from "react";
import { MyGlobalContext } from "../App";
import clsx from "clsx";

interface SearchInputProps {
  language: "english" | "japanese" | "spanish";
  inputRef?: React.RefObject<HTMLInputElement>;
  handleKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  // handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  language,
  inputRef,
  handleKeyUp,
}) => {
  const { languagesState } = useContext(MyGlobalContext);

  const { wordsList, searchWord, addWord, editWordMode } =
    languagesState[language];

  const disabled = addWord || editWordMode;
  return (
    <input
      type="text"
      placeholder={`Search...       ${wordsList.length} words`}
      ref={inputRef}
      // defaultValue={languagesState[language].inputValue || ""}
      defaultValue={searchWord || ""}
      // className="px-4 py-1 border rounded-full text-slate-600 border-slate-600 outline-none bg-gray-100 focus:bg-white focus:border-cyan-100 focus:ring-1 focus:ring-cyan-100"
      className={clsx(
        "px-2 py-1 md:py-2 shadow-md md:text-lg hover:rounded-lg transition-[border-radius] duration-500 ease-in-out border outline-none",
        {
          "bg-gray-300 rounded-full border-slate-600 shadow-none text-gray-400":
            disabled,
        },
        {
          "border-2 border-white text-slate-600": !disabled,
        }
      )}
      onKeyUp={(e) => handleKeyUp(e)}
      // onChange={handleChange}
      autoFocus
      disabled={addWord || editWordMode}
    />
  );
};

export default SearchInput;
