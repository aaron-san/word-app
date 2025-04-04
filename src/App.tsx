import { useState, createContext, useEffect, useRef } from "react";
import { GlobalContent } from "../types/types"; // Make sure types are correct

import SearchPanel from "./components/SearchPanel";
import SearchResults from "./components/SearchResults";
import MarkedWords from "./components/MarkedWords";
import HeaderButton from "./components/HeaderButton";
import data from "./data/db-sample.json";

export const SERVERPORT = 3400;

export const MyGlobalContext = createContext<GlobalContent>({
  // set a default value
  languagesState: {
    english: {
      wordsList: [],
      searchWord: "",
      addWord: false,
      showResults: false,
      editWordMode: false,
      idToEdit: "",
      inputValue: "",
    },
    japanese: {
      wordsList: [],
      searchWord: "",
      addWord: false,
      showResults: false,
      editWordMode: false,
      idToEdit: "",
      inputValue: "",
    },
    spanish: {
      wordsList: [],
      searchWord: "",
      addWord: false,
      showResults: false,
      editWordMode: false,
      idToEdit: "",
      inputValue: "",
    },
  },
  setLanguagesState: () => {},
});

function App() {
  const [activeTab, setActiveTab] = useState<
    "english" | "japanese" | "spanish"
  >("english");

  const [languagesState, setLanguagesState] = useState<
    GlobalContent["languagesState"]
  >({
    english: {
      wordsList: data["english-words"],
      searchWord: "",
      addWord: false,
      showResults: false,
      editWordMode: false,
      idToEdit: "",
      inputValue: "",
    },
    japanese: {
      wordsList: data["japanese-words"],
      searchWord: "",
      addWord: false,
      showResults: false,
      editWordMode: false,
      idToEdit: "",
      inputValue: "",
    },
    spanish: {
      wordsList: data["spanish-words"],
      searchWord: "",
      addWord: false,
      showResults: false,
      editWordMode: false,
      idToEdit: "",
      inputValue: "",
    },
  });

  // const setLanguageState = (language: string, updatedState: Partial<typeof languagesState['english']>) => {
  //   setLanguagesState((prevState) => ({
  //     ...prevState,
  //     [language]: {
  //       ...prevState[language],
  //       ...updatedState,
  //     },
  //   }));
  // };

  // useEffect(() => {
  //   console.table(languagesState.english);
  //   // console.table(languagesState.japanese);
  //   // console.table(languagesState.spanish);
  // }, [languagesState.english]);

  const updateState = (
    language: "english" | "japanese" | "spanish",
    updates: { [key: string]: string | boolean }
  ) => {
    setLanguagesState({
      ...languagesState,
      [language]: {
        ...languagesState[language],
        ...updates,
      },
    });
  };
  // const handleKeyUp = (language: "english" | "japanese" | "spanish", e: React.KeyboardEvent<HTMLElement>) => {
  //   if (e.key === "Escape") {
  //     console.log("Clicked escape!");
  //     updateState(language, {
  //       searchWord: "",
  //       showResults: false,
  //       addWord: false,
  //       editWordMode: false
  //     });
  //   }
  // };

  // let inputRef = useRef<HTMLInputElement>(null);

  interface MarkedWordsProps {
    language: "english" | "japanese" | "spanish";
  }

  const GlobalEscapeKeyHandler: React.FC<MarkedWordsProps> = ({ language }) => {
    // Function that handles the Escape key press
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        updateState(language, {
          searchWord: "",
          showResults: false,
          addWord: false,
          editWordMode: false,
          inputValue: "",
        });
      }
    };

    // if (inputRef.current) {
    //   inputRef.current.value = "";
    // }
    useEffect(() => {
      // Add event listener for keyup
      window.addEventListener("keyup", handleEscapeKey);

      // Cleanup the event listener when the component unmounts
      return () => {
        window.removeEventListener("keyup", handleEscapeKey);
      };
    }, []); // Empty dependency array means this runs only once when the component mounts

    return null; // This component doesn't need to render anything
  };

  useEffect(() => {
    console.log(languagesState.english);
  }, [languagesState.english]);

  return (
    <MyGlobalContext.Provider
      value={{
        languagesState,
        setLanguagesState,
      }}
    >
      <GlobalEscapeKeyHandler language={activeTab} />
      <main className="min-h-screen pt-4 flex flex-col gap-1 pl-8 bg-gray-900 relative overflow-hidden">
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
        <div className="flex rounded-md z-30 mt-4 gap-4">
          {activeTab === "english" && (
            <>
              <div className="flex gap-2">
                <div className="z-30">
                  <div className="p-4 mx-auto bg-slate-200/80 rounded">
                    <Header title="English Words" />
                    <SearchPanel language="english" />
                    <MarkedWords language="english" />
                  </div>
                </div>
              </div>

              <SearchResults language="english" />
            </>
          )}
          {activeTab === "japanese" && (
            <>
              <div className="flex gap-2 h-fit">
                <div className="z-30">
                  <div className="p-4 mx-auto bg-slate-200/80 rounded">
                    <Header title="Japanese Words" />
                    <SearchPanel language="japanese" />
                    <MarkedWords language="japanese" />
                  </div>
                </div>
              </div>
              {/* <div className="bg-slate-700"> */}
              <SearchResults language="japanese" />
              {/* </div> */}
            </>
          )}
          {activeTab === "spanish" && (
            <>
              <div className="flex gap-2 h-fit">
                <div className="z-30">
                  <div className="p-4 mx-auto bg-slate-200/80 rounded">
                    <Header title="Spanish Words" />
                    <SearchPanel language="spanish" />
                    <MarkedWords language="spanish" />
                  </div>
                </div>
              </div>
              {/* <div className="bg-slate-700"> */}
              <SearchResults language="spanish" />
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
