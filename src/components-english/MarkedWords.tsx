import { useContext } from "react";
import { MyGlobalContext } from "../App";
import { IWord } from "../types-english";

const MarkedWords = () => {
  const { wordsList, addWord, editWordMode, setEditWordMode, setIdToEdit } =
    useContext(MyGlobalContext);

  const handleClick = (el: IWord) => {
    setIdToEdit(el.id);
    setEditWordMode(true);
  };

  const markedWords = wordsList.filter((el) => el.mark === true);
  const numStart = Math.floor(Math.random() * markedWords.length) + 1;

  return (
    <>
      {!editWordMode && !addWord && (
        <div className="marked-container">
          <ul>
            {wordsList
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

export default MarkedWords;
