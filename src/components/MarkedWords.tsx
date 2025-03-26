import React, { useContext, useMemo } from "react";
import { MyGlobalContext } from "../App";
import { IWord } from "../types-english";
import { IJWord } from "../types-japanese";
import { ISWord } from "../types-spanish";

interface MarkedWordsProps {
  wordsList: IWord[] | IJWord[] | ISWord[];
  // addWord: () => void;
  // editWordMode: (edit: boolean) => void;
  setEditWordMode: (edit: boolean) => void;
  setIdToEdit: (id: string) => void;
  setShowResults: (show: boolean) => void;
}

const MarkedWords: React.FC<MarkedWordsProps> = ({
  wordsList,
  // addWord,
  // editWordMode,
  setEditWordMode,
  setIdToEdit,
  setShowResults,
}) => {
  // const {
  //   wordsList,
  //   addWord,
  //   editWordMode,
  //   setEditWordMode,
  //   setIdToEdit,
  //   setShowResults,
  // } = useContext(MyGlobalContext);

  const handleClick = (el: (typeof wordsList)[0]) => {
    setIdToEdit(el.id);
    setEditWordMode(true);
    setShowResults(true);
  };

  const markedWords = wordsList.filter((el) => el.mark === true);
  const numStart = useMemo(
    () => Math.floor(Math.random() * markedWords.length) + 1,
    []
  );

  return (
    <div className="w-[300px]">
      <ul className="flex flex-wrap gap-2 py-4">
        {wordsList
          .filter((el) => el.mark === true)
          .slice(numStart, numStart + 8)
          .map((el) => {
            const firstWord = el.word.split(";")[0];

            return (
              <li
                className="px-2 py-1 text-center bg-gradient-to-br from-slate-800/80 to-slate-600/80 text-slate-100 rounded-xl border border-white hover:cursor-pointer hover:opacity-95 tracking-wider shadow"
                key={el.id}
                onClick={() => handleClick(el)}
              >
                <div className="">{firstWord}</div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default MarkedWords;
