import React, { useState, createContext, useEffect, useContext } from "react";
import "./App.css";
// import { Link } from "react-router-dom";
// import WordsList from "./components-english/WordsList";
import SearchBox from "./components-english/SearchPanel";
import SearchResults from "./components-english/SearchResults";
import { IWord } from "./types-english";

import JSearchBox from "./components-japanese/JSearchPanel";
import JSearchResults from "./components-japanese/JSearchResults";
import { IJWord } from "./types-japanese";

import SSearchBox from "./components-spanish/SSearchPanel";
import SSearchResults from "./components-spanish/SSearchResults";
import { ISWord } from "./types-spanish";
// import { SERVERPORT } from "../App";

// export const myContext = createContext<unknown>(null);

function App() {
  // const value = useContext(myContext);
  // function handleSubmit(formData: FormData) {
  //   console.log(formData);
  // }

  const [wordsList, setWordsList] = useState<IWord[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const [addWord, setAddWord] = useState<boolean>(false);

  const [jWordsList, setJWordsList] = useState<IJWord[]>([]);
  const [searchJWord, setSearchJWord] = useState<string>("");
  const [addJWord, setAddJWord] = useState<boolean>(false);

  const [sWordsList, setSWordsList] = useState<ISWord[]>([]);
  const [searchSWord, setSearchSWord] = useState<string>("");
  const [addSWord, setAddSWord] = useState<boolean>(false);

  useEffect(() => {
    const getEnglishWords = async () => {
      const data = await fetch(`http://localhost:${SERVERPORT}/english-words`);
      const words = await data.json();
      setWordsList(words);
    };
    getEnglishWords();
  }, []);

  useEffect(() => {
    const getJapaneseWords = async () => {
      const data = await fetch(`http://localhost:${SERVERPORT}/japanese-words`);
      const words = await data.json();
      setJWordsList(words);
    };
    getJapaneseWords();
  }, []);

  useEffect(() => {
    const getSpanishWords = async () => {
      const data = await fetch(`http://localhost:${SERVERPORT}/spanish-words`);
      const words = await data.json();
      setSWordsList(words);
    };
    getSpanishWords();
  }, []);

  return (
    <main className="min-w-screen min-h-screen pt-4 mx-auto bg-slate-700 bg-[url('./images/bg2.jpg')]  bg-no-repeat bg-cover flex gap-4 justify-center">
      <div>
        <div className="px-4 py-4 mx-auto my-6 rounded-lg bg-slate-200/80 w-fit">
          <div className="">
            <a
              className="text-[3rem] text-slate-600 font-['Bitter'] font-bold"
              href="/"
            >
              English Words
            </a>
            {/* <div className="w-[200px] h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent mx-auto"></div> */}
          </div>
          <SearchBox
            wordsList={wordsList}
            setWordsList={setWordsList}
            addWord={addWord}
            setAddWord={setAddWord}
            searchWord={searchWord}
            setSearchWord={setSearchWord}
          />
        </div>
        <SearchResults
          wordsList={wordsList}
          setWordsList={setWordsList}
          addWord={addWord}
          setAddWord={setAddWord}
          searchWord={searchWord}
          setSearchWord={setSearchWord}
        />
      </div>
      <div>
        <div className="px-4 py-4 mx-auto my-6 rounded-lg bg-slate-200/80 w-fit">
          <div className="">
            <a
              className="text-[3rem] text-slate-600 font-['Bitter'] font-bold"
              href="/"
            >
              Japanese Words
            </a>
            {/* <div className="w-[200px] h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent mx-auto"></div> */}
          </div>
          <JSearchBox
            jWordsList={jWordsList}
            setJWordsList={setJWordsList}
            addJWord={addJWord}
            setAddJWord={setAddJWord}
            searchJWord={searchJWord}
            setSearchJWord={setSearchJWord}
          />
        </div>
        <JSearchResults
          jWordsList={jWordsList}
          setJWordsList={setJWordsList}
          addJWord={addJWord}
          setAddJWord={setAddJWord}
          searchJWord={searchJWord}
          setSearchJWord={setSearchJWord}
        />
      </div>
      <div>
        <div className="px-4 py-4 mx-auto my-6 rounded-lg bg-slate-200/80 w-fit">
          <div className="">
            <a
              className="text-[3rem] text-slate-600 font-['Bitter'] font-bold"
              href="/"
            >
              Spanish Words
            </a>
            {/* <div className="w-[200px] h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent mx-auto"></div> */}
          </div>
          <SSearchBox
            sWordsList={sWordsList}
            setSWordsList={setSWordsList}
            addSWord={addSWord}
            setAddSWord={setAddSWord}
            searchSWord={searchSWord}
            setSearchSWord={setSearchSWord}
          />
        </div>
        <SSearchResults
          sWordsList={sWordsList}
          setSWordsList={setSWordsList}
          addSWord={addSWord}
          setAddSWord={setAddSWord}
          searchSWord={searchSWord}
          setSearchSWord={setSearchSWord}
        />
      </div>
    </main>
  );
}

export default App;
