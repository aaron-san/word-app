import { useContext, useMemo } from "react";
import { MyGlobalContext } from "../App";
import { IWord } from "../types-english";

const MarkedWords = () => {
  const {
    wordsList,
    addWord,
    editWordMode,
    setEditWordMode,
    setIdToEdit,
    setShowResults,
  } = useContext(MyGlobalContext);

  const handleClick = (el: IWord) => {
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
      {/* {!editWordMode && !addWord && ( */}
      <ul className="flex flex-wrap gap-2 py-2">
        {wordsList
          .filter((el) => el.mark === true)
          .slice(numStart, numStart + 8)
          .map((el) => {
            const firstWord = el.word.split(";")[0];

            return (
              <li
                className="p-2 text-center bg-gradient-to-br from-slate-800/80 to-slate-600/80 text-slate-100 rounded-md border-2 border-white hover:cursor-pointer hover:opacity-95 tracking-wider"
                key={el.id}
                onClick={() => handleClick(el)}
              >
                <div className="">{firstWord}</div>
              </li>
            );
          })}
      </ul>
      {/* )} */}
    </div>
  );
};

export default MarkedWords;
