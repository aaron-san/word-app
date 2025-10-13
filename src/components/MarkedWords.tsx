import React, { useContext, useMemo } from "react";
import { MyGlobalContext } from "../App";
import { IWord } from "../../types/types-english";
import { IJWord } from "../../types/types-japanese";
import { ISWord } from "../../types/types-spanish";

interface MarkedWordsProps {
  language: "english" | "japanese" | "spanish";
}

type WordList = {
  english: IWord[];
  japanese: IJWord[];
  spanish: ISWord[];
};

const MarkedWords: React.FC<MarkedWordsProps> = ({ language }) => {
  const { languagesState, setLanguagesState } = useContext(MyGlobalContext);

  // Type assertion for languagesState and ensuring we correctly access the corresponding language data
  const wordsList = languagesState[language].wordsList;

  const updateState = (updates: { [key: string]: string | boolean }) => {
    setLanguagesState({
      ...languagesState,
      [language]: {
        ...languagesState[language as keyof WordList],
        ...updates,
      },
    });
  };

  const handleClick = (el: IWord | IJWord | ISWord) => {
    updateState({
      idToEdit: "",
      editWordMode: false,
      showResults: true,
      addWord: false,
      searchWord: el.word,
    });
  };

  // Type guard to check if an element has the 'mark' property
  const hasMarkProperty = (
    el: IWord | IJWord | ISWord
  ): el is IWord | IJWord | ISWord => {
    return "mark" in el; // Check if 'mark' exists in the element
  };

  // Safely filter for marked words
  const markedWords = (wordsList as (IWord | IJWord | ISWord)[]).filter(
    (el) => {
      if (hasMarkProperty(el)) {
        return el.mark === true; // Now it's safe to access `mark`
      }
      return false; // If no `mark` property, exclude it
    }
  );

  // Generate a random number to start the slice from
  const numStart = useMemo(
    () => Math.floor(Math.random() * markedWords.length) + 1,
    [markedWords.length] // Dependency on markedWords.length to update numStart when markedWords changes
  );

const getNumberOfMarkedToShow = () => {
    const numberToShow = language === "japanese" ? 14 : 8;
    return Math.min(markedWords.length, numberToShow);
  };

  return (
    <div className="md:min-w-[300px]">
      <ul className="flex flex-wrap justify-stretch gap-2 py-4">
        {markedWords
          .slice(numStart, numStart + getNumberOfMarkedToShow())
          .map((el: IWord | IJWord | ISWord) => {
            const firstWord = el.word.split(";")[0];

            return (
              <li
                className={`bg-gradient-to-br from-slate-200/80 to-slate-100/80 hover:opacity-95 shadow px-2 py-1 border border-white rounded-xl text-slate-800 text-center tracking-wider hover:cursor-pointer                   
                  ${language === "japanese" ? "text-2xl" : "text-xl"}`
                }
                key={el.id}
                onClick={() => handleClick(el)}
              >
                {language !== "japanese" && (
                  <div>{firstWord}</div>
                )}
                {language === "japanese" && "japanese" in el && typeof el.japanese === "string" && (
                  <div>{el.japanese.split(";")[0]}</div>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default MarkedWords;
