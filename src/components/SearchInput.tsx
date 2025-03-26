import React from "react";
import { IWord } from "../types-english";
import { ISWord } from "../types-spanish";
import { IJWord } from "../types-japanese";

interface SearchInputProps {
  wordsList: IWord[] | ISWord[] | IJWord[];
  inputRef: React.RefObject<HTMLInputElement>;
  searchWord: string;
  handleKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addWord: boolean;
  editWordMode: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  wordsList,
  inputRef,
  searchWord,
  handleKeyUp,
  handleChange,
  addWord,
  editWordMode,
}) => {
  return (
    <input
      type="text"
      placeholder={`Search...       ${wordsList.length} words`}
      ref={inputRef}
      defaultValue={searchWord}
      className="px-4 py-1 border rounded-full text-slate-600 border-slate-600 outline-none"
      onKeyUp={(e) => handleKeyUp(e)}
      onChange={handleChange}
      autoFocus
      disabled={addWord || editWordMode}
    />
  );
};

export default SearchInput;
