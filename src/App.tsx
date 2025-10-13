import { useState, createContext, useEffect, useRef } from "react";
import { GlobalContent } from "../types/types"; // Make sure types are correct

import SearchPanel from "./components/SearchPanel";
import SearchResults from "./components/SearchResults";
import HeaderButton from "./components/HeaderButton";
import data from "./data/db-sample.json";
import { IWord } from "../types/types-english";
import { IJWord } from "../types/types-japanese";
import { ISWord } from "../types/types-spanish";
import { SERVERPORT } from "./utils/constants";

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
  >("japanese");
  // console.log("----", import.meta.env.VITE_ENVIRONMENT);

  const [englishWords, setEnglishWords] = useState<IWord[]>([]);
  const [japaneseWords, setJapaneseWords] = useState<IJWord[]>([]);
  const [spanishWords, setSpanishWords] = useState<ISWord[]>([]);

  // Reused properties for each language state
  const sharedProperties = {
    searchWord: "",
    addWord: false,
    showResults: false,
    editWordMode: false,
    idToEdit: "",
    inputValue: "",
  };

  const fetchWords = async () => {
    try {
      let eWords: IWord[] = [];
      let jWords: IJWord[] = [];
      let sWords: ISWord[] = [];

      if (import.meta.env.VITE_ENVIRONMENT !== "production") {
        const english = await fetch(
          `http://localhost:${SERVERPORT}/english-words`
        );
        const japanese = await fetch(
          `http://localhost:${SERVERPORT}/japanese-words`
        );
        const spanish = await fetch(
          `http://localhost:${SERVERPORT}/spanish-words`
        );

        eWords = await english.json();
        jWords = await japanese.json();
        sWords = await spanish.json();
      } else {
        eWords = data["english-words"];
        jWords = data["japanese-words"];
        sWords = data["spanish-words"];
      }

      // // Optional: still keep individual word states if you use them somewhere
      // setEnglishWords(eWords);
      // setJapaneseWords(jWords);
      // setSpanishWords(sWords);

      // Use the freshly fetched values directly here
      setLanguagesState({
        english: {
          wordsList: eWords,
          ...sharedProperties,
        },
        japanese: {
          wordsList: jWords,
          ...sharedProperties,
        },
        spanish: {
          wordsList: sWords,
          ...sharedProperties,
        },
      });
    } catch (error) {
      console.error("Failed to fetch word lists:", error);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const [languagesState, setLanguagesState] = useState<
    GlobalContent["languagesState"]
  >({
    english: {
      // wordsList: data["english-words"],
      wordsList: [],
      ...sharedProperties,
    },
    japanese: {
      wordsList: [],
      ...sharedProperties,
    },
    spanish: {
      wordsList: [],
      ...sharedProperties,
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
          // searchWord: "",
          // showResults: false,
          addWord: false,
          editWordMode: false,
          inputValue: "",
        });
      }
    };

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

  return (
    <MyGlobalContext.Provider
      value={{
        languagesState,
        setLanguagesState,
      }}
    >
      <GlobalEscapeKeyHandler language={activeTab} />
      <main className="relative flex flex-col gap-1 bg-gray-900 px-4 pt-4 md:pl-8 min-h-screen overflow-hidden">
        <div className="flex flex-wrap gap-2 text-white md:text-xl">
          <HeaderButton
            title="Japanese"
            language="japanese"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            // className="bg-red-700"
          />
          <HeaderButton
            title="English"
            language="english"
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
        <div className="z-30 flex md:flex-row flex-col gap-4 mt-4 rounded-md md:w-3/8">
          <div className="flex md:flex-row flex-col gap-2">
            <SearchPanel language={activeTab} />
            <SearchResults language={activeTab} />
          </div>
          {/* {activeTab === "english" && (
            <div className="flex md:flex-row flex-col gap-2">
              <SearchPanel language="english" />
              <SearchResults language="english" />
            </div>
          )}
          {activeTab === "japanese" && (
            <div className="flex md:flex-row flex-col gap-2">
              <SearchPanel language="japanese" />
              <SearchResults language="japanese" />
            </div>
          )}
          {activeTab === "spanish" && (
            <div className="flex md:flex-row flex-col gap-2">
              <SearchPanel language="spanish" />
              <SearchResults language="spanish" />
            </div>
          )} */}
        </div>
        <div className="bg-gradient bg-gradient-upper"></div>
        <div className="bg-gradient bg-gradient-lower"></div>
      </main>
    </MyGlobalContext.Provider>
  );
}

export default App;
