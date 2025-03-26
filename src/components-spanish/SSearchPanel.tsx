import React, { useEffect, useRef, useState, useContext } from "react";
import { MyGlobalContext, SERVERPORT } from "../App";
import AddButton from "../components/AddButton";
import SearchInput from "../components/SearchInput";
import { ISWord } from "../types-spanish";

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

  // Doesn't work?????
  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>
    // ie: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setSearchSWord(e.currentTarget.value);
      setShowSResults(true);
    }
    if (e.key === "Escape") {
      if (inputSRef.current?.value) inputSRef.current.value = "";
      setSearchSWord("");
      setShowSResults(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputSRef.current) inputSRef.current.value = e.target.value;
  };

  return (
    <div className="mx-auto rounded-md">
      <div className="flex gap-2 rounded w-fit ">
        {/* Search Bar */}
          <SearchInput
            wordsList={sWordsList as ISWord[]}
            inputRef={inputSRef}
            searchWord={searchSWord}
            handleKeyUp={handleKeyUp}
            handleChange={handleChange}
            addWord={addSWord}
            editWordMode={editSWordMode}
          />
        
          <AddButton
            addWordHandler={addWordHandler}
            disabled={addSWord || editSWordMode}
          />
      </div>
      <div className="flex flex-wrap gap-2 p-1 mt-2 text-xl text-center text-slate-600 w-[300px]">
        <button
          className="w-10 h-10 p-1 border rounded border-slate-600 hover:bg-slate-100 active:scale-[98%]"
          // onClick={() => navigator.clipboard.writeText("á")}
          onClick={() => clickHandler("á")}
        >
          á
        </button>
        <button
          className="w-10 h-10 p-1 border rounded border-slate-600 hover:bg-slate-100/80 active:scale-[98%]"
          // onClick={() => navigator.clipboard.writeText("é")}
          onClick={() => clickHandler("é")}
        >
          é
        </button>

        <button
          className="w-10 h-10 p-1 border rounded border-slate-600 hover:bg-slate-100/80 active:scale-[98%]"
          // onClick={() => navigator.clipboard.writeText("í")}
          onClick={() => clickHandler("í")}
        >
          í
        </button>
        <button
          className="w-10 h-10 p-1 border rounded border-slate-600 hover:bg-slate-100/80 active:scale-[98%]"
          // onClick={() => navigator.clipboard.writeText("ó")}
          onClick={() => clickHandler("ó")}
        >
          ó
        </button>
        <button
          className="w-10 h-10 p-1 border rounded border-slate-600 hover:bg-slate-100/80 active:scale-[98%]"
          // onClick={() => navigator.clipboard.writeText("ú")}
          onClick={() => clickHandler("ú")}
        >
          ú
        </button>
        <button
          className="w-10 h-10 p-1 border rounded border-slate-600 hover:bg-slate-100/80 active:scale-[98%]"
          // onClick={() => navigator.clipboard.writeText("ü")}
          onClick={() => clickHandler("ü")}
        >
          ü
        </button>
        <button
          className="w-10 h-10 p-1 border rounded border-slate-600 hover:bg-slate-100/80 active:scale-[98%]"
          // onClick={() => navigator.clipboard.writeText("ñ")}
          onClick={() => clickHandler("ñ")}
        >
          ñ
        </button>
        <button
          className="w-10 h-10 p-1 border rounded border-slate-600 hover:bg-slate-100/80 active:scale-[98%]"
          // onClick={() => navigator.clipboard.writeText("¿")}
          onClick={() => clickHandler("¿")}
        >
          ¿
        </button>
        <button
          className="w-10 h-10 p-1 border rounded border-slate-600 hover:bg-slate-100/80 active:scale-[98%]"
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
