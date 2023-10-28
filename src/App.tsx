import React, { useState, createContext, useEffect } from "react";
import "./App.css";

import { IWord } from "./types-english";
import { IJWord } from "./types-japanese";
import { ISWord } from "./types-spanish";

export type GlobalContent = {
  // Words list
  wordsList: IWord[];
  setWordsList: (c: IWord[]) => void;
  jWordsList: IJWord[];
  setJWordsList: (c: IJWord[]) => void;
  sWordsList: ISWord[];
  setSWordsList: (c: ISWord[]) => void;
  // Search word
  searchWord: string;
  setSearchWord: (c: string) => void;
  searchJWord: string;
  setSearchJWord: (c: string) => void;
  searchSWord: string;
  setSearchSWord: (c: string) => void;
  // Add word
  addWord: boolean;
  setAddWord: (c: boolean) => void;
  addJWord: boolean;
  setAddJWord: (c: boolean) => void;
  addSWord: boolean;
  setAddSWord: (c: boolean) => void;
  // Search results
  showResults: boolean;
  setShowResults: (c: boolean) => void;
  showJResults: boolean;
  setShowJResults: (c: boolean) => void;
  showSResults: boolean;
  setShowSResults: (c: boolean) => void;
  // Edit word mode
  editWordMode: boolean;
  setEditWordMode: (c: boolean) => void;
  editJWordMode: boolean;
  setEditJWordMode: (c: boolean) => void;
  editSWordMode: boolean;
  setEditSWordMode: (c: boolean) => void;
  // Id to edit
  idToEdit: string;
  setIdToEdit: (c: string) => void;
  jIdToEdit: string;
  setJIdToEdit: (c: string) => void;
  sIdToEdit: string;
  setSIdToEdit: (c: string) => void;
};
export const MyGlobalContext = createContext<GlobalContent>({
  // set a default value
  // Words list
  wordsList: [],
  setWordsList: () => {},
  jWordsList: [],
  setJWordsList: () => {},
  sWordsList: [],
  setSWordsList: () => {},
  // Search word
  searchWord: "",
  setSearchWord: () => {},
  searchJWord: "",
  setSearchJWord: () => {},
  searchSWord: "",
  setSearchSWord: () => {},
  // Add word
  addWord: false,
  setAddWord: () => {},
  addJWord: false,
  setAddJWord: () => {},
  addSWord: false,
  setAddSWord: () => {},
  // Show results
  showResults: true,
  setShowResults: () => {},
  showJResults: true,
  setShowJResults: () => {},
  showSResults: true,
  setShowSResults: () => {},
  // Edit word mode
  editWordMode: false,
  setEditWordMode: () => {},
  editJWordMode: false,
  setEditJWordMode: () => {},
  editSWordMode: false,
  setEditSWordMode: () => {},
  // Id to edit
  idToEdit: "",
  setIdToEdit: () => {},
  jIdToEdit: "",
  setJIdToEdit: () => {},
  sIdToEdit: "",
  setSIdToEdit: () => {},
});

import SearchBox from "./components-english/SearchBox";
import SearchResults from "./components-english/SearchResults";
import JSearchBox from "./components-japanese/JSearchBox";
import JSearchResults from "./components-japanese/JSearchResults";
import SSearchBox from "./components-spanish/SSearchBox";
import SSearchResults from "./components-spanish/SSearchResults";

function App() {
  const [showTab, setShowTab] = useState<string>("english");

  const [wordsList, setWordsList] = useState<IWord[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const [addWord, setAddWord] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(true);
  const [editWordMode, setEditWordMode] = useState<boolean>(false);
  const [idToEdit, setIdToEdit] = useState<string>("");

  const [jWordsList, setJWordsList] = useState<IJWord[]>([]);
  const [searchJWord, setSearchJWord] = useState<string>("");
  const [addJWord, setAddJWord] = useState<boolean>(false);
  const [showJResults, setShowJResults] = useState<boolean>(true);
  const [editJWordMode, setEditJWordMode] = useState<boolean>(false);
  const [jIdToEdit, setJIdToEdit] = useState<string>("");

  const [sWordsList, setSWordsList] = useState<ISWord[]>([]);
  const [searchSWord, setSearchSWord] = useState<string>("");
  const [addSWord, setAddSWord] = useState<boolean>(false);
  const [showSResults, setShowSResults] = useState<boolean>(true);
  const [editSWordMode, setEditSWordMode] = useState<boolean>(false);
  const [sIdToEdit, setSIdToEdit] = useState<string>("");

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
    <MyGlobalContext.Provider
      value={{
        wordsList,
        setWordsList,
        jWordsList,
        setJWordsList,
        sWordsList,
        setSWordsList,
        searchWord,
        setSearchWord,
        searchJWord,
        setSearchJWord,
        searchSWord,
        setSearchSWord,
        addWord,
        setAddWord,
        addJWord,
        setAddJWord,
        addSWord,
        setAddSWord,
        showResults,
        setShowResults,
        showJResults,
        setShowJResults,
        showSResults,
        setShowSResults,
        editWordMode,
        setEditWordMode,
        editJWordMode,
        setEditJWordMode,
        editSWordMode,
        setEditSWordMode,
        idToEdit,
        setIdToEdit,
        jIdToEdit,
        setJIdToEdit,
        sIdToEdit,
        setSIdToEdit,
      }}
    >
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
                <SearchBox />
              </div>
              <SearchResults />
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
                <JSearchBox />
              </div>
              <JSearchResults />
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
                <SSearchBox />
              </div>
              <SSearchResults />
            </div>
          )}
        </div>
      </main>
    </MyGlobalContext.Provider>
  );
}

export default App;
