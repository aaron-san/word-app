import { useContext } from "react";
import { MyGlobalContext } from "../App";
import { ISWord } from "../types-spanish";

const SMarkedWords = () => {
  const {
    sWordsList,
    addSWord,
    editSWordMode,
    setEditSWordMode,
    setSIdToEdit,
  } = useContext(MyGlobalContext);

  const handleClick = (el: ISWord) => {
    setSIdToEdit(el.id);
    setEditSWordMode(true);
  };

  const markedWords = sWordsList.filter((el) => el.mark === true);
  const numStart = Math.floor(Math.random() * markedWords.length) + 1;

  return (
    <>
      {!editSWordMode && !addSWord && (
        <div className="marked-container">
          <ul>
            {sWordsList
              .filter((el) => el.mark === true)
              .slice(numStart, numStart + 8)
              .map((el) => {
                const firstWord = el.word.split(";")[0];

                return (
                  <li
                    className="marked"
                    key={el.id}
                    onClick={() => handleClick(el)}
                  >
                    {firstWord}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </>
  );
};

export default SMarkedWords;
