import React, { useEffect, useRef, useState, useContext } from "react";
import { MyGlobalContext, SERVERPORT } from "../App";

const SSearchBox = () => {
  useEffect(() => {
    const getSpanishWords = async () => {
      const data = await fetch(`http://localhost:${SERVERPORT}/spanish-words`);
      const words = await data.json();
      setSWordsList(words);
    };
    getSpanishWords();
  }, []);
  // console.log("SSearchBox");
  const {
    sWordsList,
    setSWordsList,
    addSWord,
    setAddSWord,
    searchSWord,
    setSearchSWord,
    setShowSResults,
    editSWordMode,
  } = useContext(MyGlobalContext);
  let inputSRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputSRef.current?.focus();
    if (inputSRef.current?.value) setSearchSWord(inputSRef.current?.value);
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
    if (inputSRef.current?.value) setSearchSWord(inputSRef.current.value);
    setShowSResults(false);
  };

  // const onAddSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchSWord(e.target.value);
  // };

  const clickHandler = (letter: string) => {
    // setSearchSWord(`${searchSWord}${letter}`);
    // console.log(searchSWord);
    // if (inputSRef.current) {
    //   inputSRef.current.value = `${searchSWord}${letter}`;
    // }
    navigator.clipboard.writeText(letter);

    inputSRef.current?.focus();
    // alert("Clicked symbol");
  };

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>
    // ie: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setSearchSWord(e.currentTarget.value);
    }
    if (e.key === "Escape") {
      if (inputSRef.current?.value) inputSRef.current.value = "";
      setSearchSWord("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputSRef.current) inputSRef.current.value = e.target.value;
  };

  return (
    <div className="mx-auto rounded-md">
      <div className="flex justify-start gap-2 m-2 mx-auto rounded-md w-fit ">
        {/* Search Bar */}
        {!addSWord && !editSWordMode && (
          <input
            type="text"
            placeholder={`Search...       ${sWordsList.length} words`}
            ref={inputSRef}
            defaultValue={searchSWord}
            className="p-2 text-lg text-slate-600 border-2 border-slate-600 rounded-md"
            onKeyUp={(e) => handleKeyUp(e)}
            onChange={handleChange}
          />
        )}
        {!addSWord && !editSWordMode && (
          <div className="flex flex-col justify-center ">
            <button
              className="px-2 py-2 mr-2 border-2 border-white rounded-md active:scale-[98%] bg-cyan-100 text-slate-600 shadow-md text-lg"
              onClick={addWordHandler}
            >
              Add Word!
            </button>
            {/* <div className="mx-auto mt-1 text-sm text-slate-400">
              {`${sWordsList.length} words`}
            </div> */}
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-2 p-2 mt-2 text-2xl text-center text-slate-600">
        <button
          className="w-12 h-12 px-2 py-1 border rounded-md border-slate-600 hover:bg-slate-100 active:scale-[98%]"
          // onClick={() => navigator.clipboard.writeText("á")}
          onClick={() => clickHandler("á")}
        >
          á
        </button>
        <button
          className="w-12 h-12 px-2 py-1 border rounded-md border-slate-600 hover:bg-slate-100/80 active:scale-[98%]"
          // onClick={() => navigator.clipboard.writeText("é")}
          onClick={() => clickHandler("é")}
        >
          é
        </button>

        <button
          className="w-12 h-12 px-2 py-1 border rounded-md border-slate-600 hover:bg-slate-100/80 active:scale-[98%]"
          // onClick={() => navigator.clipboard.writeText("í")}
          onClick={() => clickHandler("í")}
        >
          í
        </button>
        <button
          className="w-12 h-12 px-2 py-1 border rounded-md border-slate-600 hover:bg-slate-100/80 active:scale-[98%]"
          // onClick={() => navigator.clipboard.writeText("ó")}
          onClick={() => clickHandler("ó")}
        >
          ó
        </button>
        <button
          className="w-12 h-12 px-2 py-1 border rounded-md border-slate-600 hover:bg-slate-100/80 active:scale-[98%]"
          // onClick={() => navigator.clipboard.writeText("ú")}
          onClick={() => clickHandler("ú")}
        >
          ú
        </button>
        <button
          className="w-12 h-12 px-2 py-1 border rounded-md border-slate-600 hover:bg-slate-100/80 active:scale-[98%]"
          // onClick={() => navigator.clipboard.writeText("ü")}
          onClick={() => clickHandler("ü")}
        >
          ü
        </button>
        <button
          className="w-12 h-12 px-2 py-1 border rounded-md border-slate-600 hover:bg-slate-100/80 active:scale-[98%]"
          // onClick={() => navigator.clipboard.writeText("ñ")}
          onClick={() => clickHandler("ñ")}
        >
          ñ
        </button>
        <button
          className="w-12 h-12 px-2 py-1 border rounded-md border-slate-600 hover:bg-slate-100/80 active:scale-[98%]"
          // onClick={() => navigator.clipboard.writeText("¿")}
          onClick={() => clickHandler("¿")}
        >
          ¿
        </button>
        <button
          className="w-12 h-12 px-2 py-1 border rounded-md border-slate-600 hover:bg-slate-100/80 active:scale-[98%]"
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
