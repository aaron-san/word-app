import React, { useEffect, useRef, useState } from "react";
import { IDefaults, IWord, IWords } from "../types-english";
import AddWord, { FormValues } from "./AddWord";
// import { v4 as uuidv4 } from "uuid";
import Form from "./Form";

const SearchBox = ({
  wordsList,
  setWordsList,
  addWord,
  setAddWord,
  searchWord,
  setSearchWord,
  showResults,
  setShowResults,
}: IWords) => {
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  // const [showSearchBox, setShowSearchBox] = useState<boolean>(true)

  const [editWordMode, setEditWordMode] = useState<boolean>(false);

  // Add throttle (delay) to onChange handler
  // const [filteredWords, setFilteredWords] = useState<IWord[]>([]);

  // const doWordFilter = (e: string) => {
  //   if (!e) return setFilteredWords([]);

  //   setTimeout(() => {
  //     console.log("====>", e);
  //     setFilteredWords(
  //       wordsList.filter((el) => el.word.toLowerCase().includes(searchWord))
  //     );
  //   }, 1);
  // };

  const addWordHandler = () => {
    // setFocus("word");
    setAddWord(true);
    setShowResults(false);
    // console.log("Add Word: ", searchWord);
  };

  return (
    <div className="flex justify-start gap-2 mx-auto rounded-md w-fit bg-slate-800/70">
      {/* Search Bar */}
      {!addWord && !editWordMode && (
        <input
          type="text"
          placeholder="Search..."
          // ref={searchRef}
          value={searchWord}
          className="p-2 m-2 text-lg text-white bg-transparent border-2 rounded-md"
          // onChange={(e) => doWordFilter(e.target.value)}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      )}
      {!addWord && !editWordMode && (
        <div className="flex flex-col justify-center ">
          <button
            className="px-2 py-2 mt-2 mr-2 border border-white rounded-md active:scale-95 bg-slate-100 text-slate-700"
            onClick={addWordHandler}
          >
            Add Word!
          </button>
          <div className="mx-auto mt-1 text-sm text-slate-400">
            {`${wordsList.length} words`}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
