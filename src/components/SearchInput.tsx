import React, { useContext } from "react";
import { MyGlobalContext } from "../App";

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
  return (
    <input
      type="text"
      placeholder={`Search...       ${wordsList.length} words`}
      ref={inputRef}
      // defaultValue={languagesState[language].inputValue || ""}
      defaultValue={searchWord || ""}
      className="px-4 py-1 border rounded-full text-slate-600 border-slate-600 outline-none"
      onKeyUp={(e) => handleKeyUp(e)}
      // onChange={handleChange}
      autoFocus
      disabled={addWord || editWordMode}
    />
  );
};

export default SearchInput;
