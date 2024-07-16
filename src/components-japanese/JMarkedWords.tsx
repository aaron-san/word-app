import { useContext } from "react";
import { MyGlobalContext } from "../App";
import { IJWord } from "../types-japanese";

const JMarkedWords = () => {
  const {
    jWordsList,
    addJWord,
    editJWordMode,
    setEditJWordMode,
    setJIdToEdit,
  } = useContext(MyGlobalContext);

  const handleClick = (el: IJWord) => {
    setJIdToEdit(el.id);
    setEditJWordMode(true);
  };

  const markedWords = jWordsList.filter((el) => el.mark === true);
  const numStart = Math.floor(Math.random() * markedWords.length) + 1;

  return (
    <>
      {!editJWordMode && !addJWord && (
        <div className="marked-container">
          <ul>
            {jWordsList
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

export default JMarkedWords;
