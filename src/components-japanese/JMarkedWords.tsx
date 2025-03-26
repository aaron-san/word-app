import { useContext, useMemo } from "react";
import { MyGlobalContext } from "../App";
import { IJWord } from "../types-japanese";

const JMarkedWords = () => {
  const {
    jWordsList,
    addJWord,
    editJWordMode,
    setEditJWordMode,
    setShowJResults,
    setJIdToEdit,
  } = useContext(MyGlobalContext);

  const handleClick = (el: IJWord) => {
    setJIdToEdit(el.id);
    setEditJWordMode(true);
    setShowJResults(true);
  };

  const markedWords = jWordsList.filter((el) => el.mark === true);
  const numStart = useMemo(
    () => Math.floor(Math.random() * markedWords.length) + 1,
    []
  );

  return (
    <div className="w-[300px]">
      <ul className="flex flex-wrap gap-2 p-2">
        {jWordsList
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
    </div>
  );
};

export default JMarkedWords;
