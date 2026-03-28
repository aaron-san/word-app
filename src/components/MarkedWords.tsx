import React, { useContext, useMemo } from "react";
import { MyGlobalContext } from "../App";
import { IWord } from "../../types/types-english";
import { IJWord } from "../../types/types-japanese";
import { ISWord } from "../../types/types-spanish";


const MARKED_JP_WORDS_TO_SHOW = 14;
const MARKED_DEFAULT_WORDS_TO_SHOW = 13;

const COLORS = [
  "bg-pink-200",
  "bg-sky-200",
  "bg-emerald-200",
  "bg-amber-200",
  "bg-green-200",
  "bg-yellow-200",
  "bg-blue-200",
  "bg-orange-200",
  "bg-purple-200",
  "bg-lime-200",
  "bg-red-200",
  "bg-stone-200",
  "bg-gray-200"
];

const ROTATIONS = [
  "rotate-[-1deg]",
  "rotate-[-2deg]",
  "rotate-[1deg]",
  "rotate-[2deg]",
];

const getRandom = <T,>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

type StyledWord = (IWord | IJWord | ISWord) & {
  color: string;
  rotation: string;
};

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

  const styledWords: StyledWord[] = useMemo(() => {
  return markedWords.map((word) => ({
    ...word,
    color: getRandom(COLORS),
    rotation: getRandom(ROTATIONS),
  }));
}, [markedWords]);

  // Generate a random number to start the slice from
  const numStart = useMemo(
    () => Math.floor(Math.random() * markedWords.length) + 1,
    [markedWords.length] // Dependency on markedWords.length to update numStart when markedWords changes
  );

const getNumberOfMarkedToShow = () => {
    const numberToShow = language === "japanese" ? MARKED_JP_WORDS_TO_SHOW : MARKED_DEFAULT_WORDS_TO_SHOW;
    return Math.min(markedWords.length, numberToShow);
  };

  return (
    <div className="md:min-w-[300px]">
      <ul className="flex flex-wrap justify-stretch gap-2 py-4">
        {styledWords
          .slice(numStart, numStart + getNumberOfMarkedToShow())
          .map((el) => {
            const firstWord = el.word.split(";")[0];

            return (
              <li
                className={`${el.color} ${el.rotation}     
                  hover:scale-105 transition-transform duration-200
                  hover:opacity-95 px-2 py-1
                   text-slate-800 text-center tracking-wider shadow-[0_2px_6px_rgba(0,0,0,0.08)] 
                  hover:cursor-pointer
                  ${language === "japanese" ? "text-xl" : "text-base"}
                `}
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
