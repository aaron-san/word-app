import React, { useEffect, useRef, useState } from "react";
import { IJDefaults, IJWord, IJWords } from "../types-japanese";
// import { v4 as uuidv4 } from "uuid";

const JSearchBox = ({
  jWordsList,
  setJWordsList,
  addJWord,
  setAddJWord,
  searchJWord,
  setSearchJWord,
  showJResults,
  setShowJResults,
}: IJWords) => {
  // const searchJRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   searchJRef.current?.focus();
  // }, []);

  // const [showSearchBox, setShowSearchBox] = useState<boolean>(true)

  const [editJWordMode, setEditJWordMode] = useState<boolean>(false);

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
    setAddJWord(true);
    setShowJResults(false);
  };

  return (
    <div className="flex justify-start gap-2 mx-auto rounded-md w-fit bg-slate-800/70">
      {/* Search Bar */}
      {!addJWord && !editJWordMode && (
        <input
          type="text"
          placeholder="Search..."
          value={searchJWord}
          // ref={searchRef}
          className="p-2 m-2 text-lg text-white bg-transparent border-2 rounded-md"
          // onChange={(e) => doWordFilter(e.target.value)}
          onChange={(e) => setSearchJWord(e.target.value)}
        />
      )}
      {!addJWord && !editJWordMode && (
        <div className="flex flex-col justify-center ">
          <button
            className="px-2 py-2 mt-2 mr-2 border border-white rounded-md active:scale-95 bg-slate-100 text-slate-700"
            onClick={addWordHandler}
          >
            Add Word!
          </button>
          <div className="mx-auto mt-1 text-sm text-slate-400">
            {`${jWordsList.length} words`}
          </div>
        </div>
      )}
    </div>
  );
};

export default JSearchBox;
