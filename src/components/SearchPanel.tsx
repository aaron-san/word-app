import { useEffect, useRef, useContext, useState } from "react";
import { MyGlobalContext } from "../App";
import AddButton from "./AddButton";
import SearchInput from "./SearchInput";
import MarkedWords from "./MarkedWords";

interface SearchPanelProps {
  language: "english" | "japanese" | "spanish";
  // inputRef?: RefObject<HTMLInputElement>;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ language }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // const {inputWord, setInputWord} = useState("")
  // Component logic here, using language and inputRef

  // useEffect(() => {
  //   const getEnglishWords = async () => {
  //     const data = await fetch(`http://localhost:${SERVERPORT}/english-words`);
  //     const words = await data.json();
  //     setWordsList(words);
  //   };
  //   getEnglishWords();
  // }, []);

  const { languagesState, setLanguagesState } = useContext(MyGlobalContext);

  // const { addWord } = languagesState[language];

  const updateState = (updates: { [key: string]: string | boolean }) => {
    setLanguagesState({
      ...languagesState,
      [language]: {
        ...languagesState[language],
        ...updates,
      },
    });
  };
  // let searchWordRef = useRef<string>("");

  // useEffect(() => {
  //   // if (inputRef && inputRef.current?.value) {
  //     // inputRef.current.focus();
  //     // updateState({
  //     //   searchWord: inputRef?.current?.value || "",
  //     // });
  //   }
  // }, [addWord]);

  const addWordHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    updateState({
      // searchWord: e.currentTarget.value,
      searchWord: inputRef?.current?.value || "",
      addWord: true,
      editWordMode: false,
      showResults: false,
    });
    // }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateState({
        searchWord: e.currentTarget.value,
        showResults: true,
      });
    }
    if (e.key === "Escape") {
      // if (inputRef?.current?.value) inputRef.current.value = "";
      updateState({
        searchWord: "",
        showResults: false,
        addWord: false,
      });
    }
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   // if (inputRef?.current) inputRef.current.value = e.target.value;
  //   setInputWord(e.target.value);
  // };

  return (
    <div className="bg-slate-200/80 rounded flex flex-col sm:max-w-[360px] p-4 h-fit">
      <Header
        title={`${language.charAt(0).toUpperCase()}${language.slice(1)} Words`}
      />
      <div className="flex flex-col md:flex-row justify-start gap-2 rounded">
        {/* Search Bar */}

        <SearchInput
          language={language}
          inputRef={inputRef}
          handleKeyUp={handleKeyUp}
          // handleChange={handleChange}
        />

        <AddButton language={language} addWordHandler={addWordHandler} />
      </div>
      <MarkedWords language={language} />
    </div>
  );
};

const Header = ({ title }: { title: string }) => {
  return (
    <div>
      <a className="text-[1.6rem] text-slate-700 font-['Bitter'] font-bold">
        {title}
      </a>
    </div>
  );
};

export default SearchPanel;
