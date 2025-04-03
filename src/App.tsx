import { useState, createContext, useEffect } from "react";
// import "./App.css";

import { IWord } from "./types-english";
import { IJWord } from "./types-japanese";
import { ISWord } from "./types-spanish";
import SearchBox from "./components-english/SearchPanel";
import SearchResults from "./components-english/SearchResults";
import MarkedWords from "./components/MarkedWords";
import JSearchBox from "./components-japanese/JSearchPanel";
import JSearchResults from "./components-japanese/JSearchResults";
import SSearchBox from "./components-spanish/SSearchPanel";
import SSearchResults from "./components-spanish/SSearchResults";
import JMarkedWords from "./components-japanese/JMarkedWords";
import SMarkedWords from "./components-spanish/SMarkedWords";
import clsx from "clsx";
import HeaderButton from "./components/HeaderButton";

export const SERVERPORT = 3400;

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

function App() {
  // console.log("App");
  const [activeTab, setActiveTab] = useState<string>("english");
  const [wordsList, setWordsList] = useState<IWord[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const [addWord, setAddWord] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [editWordMode, setEditWordMode] = useState<boolean>(false);
  const [idToEdit, setIdToEdit] = useState<string>("");
  const [jWordsList, setJWordsList] = useState<IJWord[]>([]);
  const [searchJWord, setSearchJWord] = useState<string>("");
  const [addJWord, setAddJWord] = useState<boolean>(false);
  const [showJResults, setShowJResults] = useState<boolean>(false);
  const [editJWordMode, setEditJWordMode] = useState<boolean>(false);
  const [jIdToEdit, setJIdToEdit] = useState<string>("");
  const [sWordsList, setSWordsList] = useState<ISWord[]>([]);
  const [searchSWord, setSearchSWord] = useState<string>("");
  const [addSWord, setAddSWord] = useState<boolean>(false);
  const [showSResults, setShowSResults] = useState<boolean>(false);
  const [editSWordMode, setEditSWordMode] = useState<boolean>(false);
  const [sIdToEdit, setSIdToEdit] = useState<string>("");

  // console.log("B");
  useEffect(() => {
    const getEnglishWords = async () => {
      const data = await fetch(`http://localhost:${SERVERPORT}/english-words`);
      const words = await data.json();
      setWordsList(words);
    };
    getEnglishWords();

    const getJapaneseWords = async () => {
      const data = await fetch(`http://localhost:${SERVERPORT}/japanese-words`);
      const words = await data.json();
      setJWordsList(words);
    };
    getJapaneseWords();

    const getSpanishWords = async () => {
      const data = await fetch(`http://localhost:${SERVERPORT}/spanish-words`);
      const words = await data.json();
      setSWordsList(words);
    };
    getSpanishWords();
  }, []);

  // useEffect(() => {
  //   console.log(activeTab);
  // }, [activeTab]);

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
      {/* <main className="min-w-screen min-h-screen pt-4 mx-auto bg-[url('./images/blue-plates.jpg')] bg-no-repeat bg-cover flex flex-wrap gap-1 justify-center"> */}
      <main className="w-screen min-h-screen pt-4 flex flex-col gap-1 pl-8 bg-gray-900">
        <div className="flex gap-2 text-2xl text-white">
          <HeaderButton
            title="English"
            language="english"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <HeaderButton
            title="Japanese"
            language="japanese"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <HeaderButton
            title="Spanish"
            language="spanish"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        <div className="flex rounded-md z-30 gap-4 mt-4">
          {activeTab === "english" && (
            <>
              <div className="flex gap-2 h-fit">
                <div className="z-30">
                  <div className="p-4 mx-auto bg-slate-200/80 rounded">
                    <Header title="English Words" />
                    <SearchBox />
                    <MarkedWords
                      wordsList={wordsList as IWord[]}
                      setEditWordMode={setEditWordMode}
                      setIdToEdit={setIdToEdit}
                      setShowResults={setShowResults}
                    />
                  </div>
                </div>
              </div>

              <SearchResults />
            </>
          )}
          {activeTab === "japanese" && (
            <>
              <div className="flex gap-2 h-fit">
                <div className="z-30">
                  <div className="p-4 mx-auto bg-slate-200/80 rounded">
                    <Header title="Japanese Words" />
                    <JSearchBox />
                    <MarkedWords
                      wordsList={jWordsList as IJWord[]}
                      setEditWordMode={setEditJWordMode}
                      setIdToEdit={setJIdToEdit}
                      setShowResults={setShowJResults}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="bg-slate-700"> */}
              <JSearchResults />
              {/* </div> */}
            </>
          )}
          {activeTab === "spanish" && (
            <>
              <div className="flex gap-2 h-fit">
                <div className="z-30">
                  <div className="p-4 mx-auto bg-slate-200/80 rounded">
                    <Header title="Spanish Words" />
                    <SSearchBox />
                    <MarkedWords
                      wordsList={sWordsList as ISWord[]}
                      setEditWordMode={setEditSWordMode}
                      setIdToEdit={setSIdToEdit}
                      setShowResults={setShowSResults}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="bg-slate-700"> */}
              <SSearchResults />
              {/* </div> */}
            </>
          )}
        </div>
        <div className="bg-gradient bg-gradient-upper"></div>
        <div className="bg-gradient bg-gradient-lower"></div>
      </main>
    </MyGlobalContext.Provider>
  );
}

const Header = ({ title }: { title: string }) => {
  return (
    <div>
      <a className="text-[1.6rem] text-slate-700 font-['Bitter'] font-bold">
        {title}
      </a>
    </div>
  );
};

export default App;
