import React, { useState, createContext, useEffect, useContext } from "react";
import "./App.css";
// import { Link } from "react-router-dom";
// import WordsList from "./components-english/WordsList";
import SearchBox from "./components-english/SearchBox";
import SearchResults from "./components-english/SearchResults";
import { IWord } from "./types-english";

import JSearchBox from "./components-japanese/JSearchBox";
import JSearchResults from "./components-japanese/JSearchResults";
import { IJWord } from "./types-japanese";

import SSearchBox from "./components-spanish/SSearchBox";
import SSearchResults from "./components-spanish/SSearchResults";
import { ISWord } from "./types-spanish";

// export const myContext = createContext<unknown>(null);

function App() {
  // const value = useContext(myContext);
  // function handleSubmit(formData: FormData) {
  //   console.log(formData);
  // }

  const [showTab, setShowTab] = useState<string>("english");

  const [wordsList, setWordsList] = useState<IWord[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const [addWord, setAddWord] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(true);

  const [jWordsList, setJWordsList] = useState<IJWord[]>([]);
  const [searchJWord, setSearchJWord] = useState<string>("");
  const [addJWord, setAddJWord] = useState<boolean>(false);
  const [showJResults, setShowJResults] = useState<boolean>(true);

  const [sWordsList, setSWordsList] = useState<ISWord[]>([]);
  const [searchSWord, setSearchSWord] = useState<string>("");
  const [addSWord, setAddSWord] = useState<boolean>(false);
  const [showSResults, setShowSResults] = useState<boolean>(true);

  useEffect(() => {
    const getEnglishWords = async () => {
      const data = await fetch("http://localhost:3000/english-words");
      const words = await data.json();
      setWordsList(words);
    };
    getEnglishWords();
  }, []);

  useEffect(() => {
    const getJapaneseWords = async () => {
      const data = await fetch("http://localhost:3000/japanese-words");
      const words = await data.json();
      setJWordsList(words);
    };
    getJapaneseWords();
  }, []);

  useEffect(() => {
    const getSpanishWords = async () => {
      const data = await fetch("http://localhost:3000/spanish-words");
      const words = await data.json();
      setSWordsList(words);
    };
    getSpanishWords();
  }, []);

  return (
    <main className="min-w-screen min-h-screen pt-4 mx-auto bg-slate-700 bg-[url('./images/bg2.jpg')]  bg-no-repeat bg-cover flex flex-wrap gap-1 justify-center">
      <div className="flex flex-col items-center justify-top">
        <div className="flex gap-2 text-2xl text-white h-fit">
          <button
            className="px-4 py-2 border rounded-md shadow-md bg-gradient-to-r from-slate-800 to-slate-700 active:scale-95 border-slate-100"
            onClick={() => setShowTab("english")}
          >
            English
          </button>
          <button
            className="px-4 py-2 border rounded-md shadow-md bg-gradient-to-r from-slate-800 to-slate-700 active:scale-95 border-slate-100"
            onClick={() => setShowTab("japanese")}
          >
            Japanese
          </button>
          <button
            className="px-4 py-2 border rounded-md shadow-md bg-gradient-to-r from-slate-800 to-slate-700 active:scale-95 border-slate-100"
            onClick={() => setShowTab("spanish")}
          >
            Spanish
          </button>
        </div>

        {showTab === "english" && (
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
                showResults={showResults}
                setShowResults={setShowResults}
              />
            </div>
            <SearchResults
              wordsList={wordsList}
              setWordsList={setWordsList}
              addWord={addWord}
              setAddWord={setAddWord}
              searchWord={searchWord}
              setSearchWord={setSearchWord}
              showResults={showResults}
              setShowResults={setShowResults}
            />
          </div>
        )}
        {showTab === "japanese" && (
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
                showJResults={showJResults}
                setShowJResults={setShowJResults}
              />
            </div>
            <JSearchResults
              jWordsList={jWordsList}
              setJWordsList={setJWordsList}
              addJWord={addJWord}
              setAddJWord={setAddJWord}
              searchJWord={searchJWord}
              setSearchJWord={setSearchJWord}
              showJResults={showJResults}
              setShowJResults={setShowJResults}
            />
          </div>
        )}
        {showTab === "spanish" && (
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
                showSResults={showSResults}
                setShowSResults={setShowSResults}
              />
            </div>
            <SSearchResults
              sWordsList={sWordsList}
              setSWordsList={setSWordsList}
              addSWord={addSWord}
              setAddSWord={setAddSWord}
              searchSWord={searchSWord}
              setSearchSWord={setSearchSWord}
              showSResults={showSResults}
              setShowSResults={setShowSResults}
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
