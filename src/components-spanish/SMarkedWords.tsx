import { useContext, useMemo } from "react";
import { MyGlobalContext } from "../App";
import { ISWord } from "../types-spanish";

const SMarkedWords = () => {
  const {
    sWordsList,
    addSWord,
    editSWordMode,
    setEditSWordMode,
    setShowSResults,
    setSIdToEdit,
  } = useContext(MyGlobalContext);

  const handleClick = (el: ISWord) => {
    setSIdToEdit(el.id);
    setEditSWordMode(true);
    setShowSResults(true);
  };

  const markedWords = sWordsList.filter((el) => el.mark === true);
  const numStart = useMemo(
    () => Math.floor(Math.random() * markedWords.length) + 1,
    []
  );

  return (
<div className="w-[300px]">
      {!editSWordMode && !addSWord && (
        <ul className="flex flex-wrap gap-2 p-2">
          {sWordsList
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
                  {firstWord}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default SMarkedWords;
