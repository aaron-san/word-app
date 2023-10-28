import React, { useEffect, useRef, useState, useContext } from "react";
import { MyGlobalContext } from "../App";

const SSearchBox = () => {
  const {
    sWordsList,
    addSWord,
    setAddSWord,
    searchSWord,
    setSearchSWord,
    setShowSResults,
    editSWordMode,
  } = useContext(MyGlobalContext);

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

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
    setAddSWord(true);
    setShowSResults(false);
  };

  // const onAddSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchSWord(e.target.value);
  // };

  const clickHandler = (letter: string) => {
    setSearchSWord(`${searchSWord}${letter}`);
    searchRef.current?.focus();
    // console.log(searchSWord);
  };

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>
    // ie: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setSearchSWord(e.currentTarget.value);
    }
  };

  return (
    <div className="p-2 mx-auto rounded-md w-fit bg-slate-800/70">
      <div className="flex justify-start gap-2 m-2 mx-auto rounded-md w-fit ">
        {/* Search Bar */}
        {!addSWord && !editSWordMode && (
          <input
            type="text"
            placeholder="Search..."
            // ref={searchRef}
            defaultValue={searchSWord}
            className="p-2 m-2 text-lg text-white bg-transparent border-2 rounded-md"
            onKeyUp={(e) => handleKeyUp(e)}
            // onChange={onAddSearchWord}
          />
        )}
        {!addSWord && !editSWordMode && (
          <div className="flex flex-col justify-center ">
            <button
              className="px-2 py-2 mt-2 mr-2 border border-white rounded-md active:scale-95 bg-slate-100 text-slate-700"
              onClick={addWordHandler}
            >
              Add Word!
            </button>
            <div className="mx-auto mt-1 text-sm text-slate-400">
              {`${sWordsList.length} words`}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-2 p-2 my-2 text-2xl text-center text-white">
        <button
          className="w-10 px-2 py-1 border rounded-md border-slate-400"
          // onClick={() => navigator.clipboard.writeText("á")}
          onClick={() => clickHandler("á")}
        >
          á
        </button>
        <button
          className="w-10 px-2 py-1 border rounded-md border-slate-400"
          // onClick={() => navigator.clipboard.writeText("é")}
          onClick={() => clickHandler("é")}
        >
          é
        </button>

        <button
          className="w-10 px-2 py-1 border rounded-md border-slate-400"
          // onClick={() => navigator.clipboard.writeText("í")}
          onClick={() => clickHandler("í")}
        >
          í
        </button>
        <button
          className="w-10 px-2 py-1 border rounded-md border-slate-400"
          // onClick={() => navigator.clipboard.writeText("ó")}
          onClick={() => clickHandler("ó")}
        >
          ó
        </button>
        <button
          className="w-10 px-2 py-1 border rounded-md border-slate-400"
          // onClick={() => navigator.clipboard.writeText("ú")}
          onClick={() => clickHandler("ú")}
        >
          ú
        </button>
        <button
          className="w-10 px-2 py-1 border rounded-md border-slate-400"
          // onClick={() => navigator.clipboard.writeText("ü")}
          onClick={() => clickHandler("ü")}
        >
          ü
        </button>
        <button
          className="w-10 px-2 py-1 border rounded-md border-slate-400"
          // onClick={() => navigator.clipboard.writeText("ñ")}
          onClick={() => clickHandler("ñ")}
        >
          ñ
        </button>
        <button
          className="w-10 px-2 py-1 border rounded-md border-slate-400"
          // onClick={() => navigator.clipboard.writeText("¿")}
          onClick={() => clickHandler("¿")}
        >
          ¿
        </button>
        <button
          className="w-10 px-2 py-1 border rounded-md border-slate-400"
          // onClick={() => navigator.clipboard.writeText("¡!")}
          onClick={() => clickHandler("¡")}
        >
          ¡
        </button>
      </div>
    </div>
  );
};

export default SSearchBox;
