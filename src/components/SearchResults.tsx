import { useRef, useContext, useState } from "react";
import { IDefaults, IWord } from "../../types/types-english";
// import AddWord from "./AddWord";
// import { v4 as uuidv4 } from "uuid";
import Form from "./english/Form";
import JForm from "./japanese/JForm";
import SForm from "./spanish/SForm";
import { MyGlobalContext, SERVERPORT } from "../App";
import { IJWord } from "../../types/types-japanese";
import { ISWord } from "../../types/types-spanish";
import React from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

type WordList = {
  english: IWord[];
  japanese: IJWord[];
  spanish: ISWord[];
};

type SearchResultsProps = {
  language: "english" | "japanese" | "spanish";
};
const SearchResults: React.FC<SearchResultsProps> = ({ language }) => {
  const { languagesState, setLanguagesState } = useContext(MyGlobalContext);

  const {
    wordsList,
    addWord,
    editWordMode,
    showResults,
    searchWord,
    idToEdit,
  } = languagesState[language];

  // const searchRef = useRef<HTMLInputElement>(null);

  const updateState = (
    // language: SearchResultsProps["language"],
    updates: { [key: string]: string | boolean | WordList[typeof language] }
  ) => {
    setLanguagesState({
      ...languagesState,
      [language]: {
        ...languagesState[language],
        ...updates,
      },
    });
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const handleDelete = (id: string) => {
    setIdToDelete(id); // Set the word for which the delete confirmation is required
    setModalOpen(true); // Open the modal

    // const deleteWord = window.prompt(
    //   `Delete ${word}? \n\nType 'DELETE' to delete`
    // );
    // if (deleteWord !== "DELETE") return;
    // // Delete data on the backend via PUT
    // try {
    //   await fetch(`http://localhost:${SERVERPORT}/english-words/${id}`, {
    //     method: "DELETE",
    //   });

    //   // Get updated words list from json server
    //   const getWords = async () => {
    //     const data = await fetch(
    //       `http://localhost:${SERVERPORT}/english-words`
    //     );
    //     const words = await data.json();
    //     setWordsList(words);
    //   };
    //   getWords();
  };

  const confirmDelete = async () => {
    if (idToDelete && inputValue === "DELETE") {
      // Handle the delete logic
      // Delete data on the backend via PUT
      try {
        await fetch(
          `http://localhost:${SERVERPORT}/english-words/${idToDelete}`,
          {
            method: "DELETE",
          }
        );
        updateState({
          wordsList: (() => {
            if (language === "english") {
              return (wordsList as IWord[]).filter(
                (el) => el.id !== idToDelete
              );
            } else if (language === "japanese") {
              return (wordsList as IJWord[]).filter(
                (el) => el.id !== idToDelete
              );
            } else if (language === "spanish") {
              return (wordsList as ISWord[]).filter(
                (el) => el.id !== idToDelete
              );
            }
            return []; // Return an empty array if the language doesn't match any case
          })(),
          editWordMode: false,
          showResults: false,
          addWord: false,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log(
        "Delete confirmation failed. Please type 'DELETE' to confirm."
      );
    }
    setModalOpen(false); // Close the modal after confirmation
  };

  const cancelDelete = () => {
    setModalOpen(false); // Close the modal without doing anything
  };

  // Delete data on the backend via PUT
  // try {
  // await fetch(`http://localhost:${SERVERPORT}/english-words/${id}`, {
  //   method: "DELETE",
  // });

  // Get updated words list from json server
  // const getWords = async () => {
  //   const data = await fetch(
  //     `http://localhost:${SERVERPORT}/english-words`
  //   );
  //   const words = await data.json();
  //   setWordsList(words);
  // };
  // getWords();
  // console.log(`Trying to delete ${word} with id ${id}`);

  // updateState({
  //   wordsList: wordsList.filter(
  //     (el) => el.id !== id
  //   ) as WordList[typeof language],
  //   editWordMode: false,
  //   showResults: false,
  //   addWord: false,
  // });

  // setLanguagesState({
  //   ...languagesState,
  //   [language]: {
  //     ...languagesState[language],
  //     wordsList: (wordsList as WordList[typeof language]).filter(
  //       (el) => el.id !== id
  //     ),
  //     editWordMode: false,
  //     showResults: false,
  //     addWord: false,
  //   },
  // });
  // } catch (err) {
  //   console.log(err);
  // }
  // };

  // Add throttle (delay) to onChange handler
  // const [filteredWords, setFilteredWords] = useState<IWord[]>([]);

  // const doWordFilter = (e: string) => {
  //   if (!e) return setFilteredWords([]);

  //   setTimeout(() => {
  //     setFilteredWords(
  //       wordsList.filter((el) => el.word.toLowerCase().includes(searchWord))
  //     );
  //   }, 1);
  // };

  const partsToInclude = [ "japanese", "english", "definition"];

  // a helper that narrows the type safely
  function hasKey<T extends object>(obj: T, key: keyof any): key is keyof T {
    return key in obj;
  }





  const getCustomStyles = (part: string) => {
    switch (part) {
      case "english":
        return "text-green-200";
      case "definition":
        return "text-amber-300";
      case "japanese":
        return "text-yellow-100 text-4xl";
        break;
      case "example":
        return "text-pink-100";
      default:
        return "text-gray-100";
    }
  };

  const filteredWords = (() => {
    if (language === "english") {
      return (wordsList as IWord[]).filter((d) => {
        return searchWord
          ? d.word?.toLowerCase().includes(searchWord.toLowerCase())
          : false;
      });
    } else if (language === "japanese") {
      return (wordsList as IJWord[]).filter((d) => {
        return searchWord
          ? d.word?.toLowerCase().includes(searchWord.toLowerCase())
          : false;
      });
    } else if (language === "spanish") {
      return (wordsList as ISWord[]).filter((d) => {
        return searchWord
          ? d.word?.toLowerCase().includes(searchWord.toLowerCase())
          : false;
      });
    }
    return []; // Return an empty array if the language doesn't match any case
  })();

  return (
    <div className="bg-slate-700 rounded max-h-[600px] overflow-auto">
      {addWord && language === "english" && (
        <Form
          // word={el as IWord}
          idToEdit={idToEdit}
          methodType="POST"
        />
      )}
      {addWord && language === "japanese" && (
        <JForm
          // word={el as IJWord}
          idToEdit={idToEdit}
          methodType="POST"
        />
      )}
      {addWord && language === "spanish" && (
        <SForm
          // word={el as ISWord}
          idToEdit={idToEdit}
          methodType="POST"
        />
      )}

      {/* Search Results */}
      {!addWord &&
        filteredWords.length === 0 &&
        showResults &&
        !editWordMode && (
          <div className="flex justify-center items-center p-8 w-60 text-white">
            No results...
          </div>
        )}
      {showResults && !editWordMode && (
        <div className="flex mx-auto max-w-[680px]">
          <div className="flex flex-wrap justify-center gap-4 mx-auto p-4">
            {filteredWords.map((el: WordList[typeof language][0]) => {
              // Return editable input fields
              return (
                <div
                  key={el.id}
                  className={`border rounded-md border-slate-200 flex flex-wrap flex-col mx-auto w-[280px] ${
                    el.mark ? "bg-blue-600/60" : "bg-slate-600/60"
                  } h-fit cursor-pointer`}
                  onClick={() => {
                    updateState({
                      idToEdit: el.id,
                      editWordMode: true,
                    });
                  }}
                >
                  <div className="bg-slate-100/80 p-2 border-1 border-slate-200 border-b rounded-t-md w-fill text-slate-900 text-xl tracking-wider">
                    {el.word}
                  </div>
                  {/* <div className="bg-gradient-to-r from-transparent via-slate-200 to-transparent my-2 px-2 w-full h-[1px]"></div> */}
                  {partsToInclude.map((part) =>
                    hasKey(el, part) && el[part] ? (
                      <div
                        key={part}
                        className={`my-2 px-2 ${getCustomStyles(part)}`}
                      >
                        {el[part]}
                        <div className="bg-gradient-to-r from-transparent via-slate-200 to-transparent my-2 w-[90%] h-[1px]" />
                      </div>
                    ) : null
                  )}

                  
                  <div className="flex justify-end items-center gap-2 px-2">
                    {/* <button
                        className="hover:bg-slate-600 m-4 px-4 py-1 border border-slate-100 rounded-md w-[80%] max-w-[100px] text-slate-100"
                        onClick={() => {
                          setIdToEdit(e.id);
                          setEditWordMode(!editWordMode);
                        }}
                      >
                        Edit
                      </button> */}
                    <button
                      className="hover:bg-slate-600 m-1 my-3 px-2 py-1 border border-red-200 rounded-full w-8 h-8 text-red-200 text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(el.id);
                      }}
                    >
                      X
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* Form - Edit Word */}
      {editWordMode && (
        <div className="flex mx-auto max-w-[680px]">
          {(wordsList as (IWord | IJWord | ISWord)[])
            .filter((el) => el.id === idToEdit)
            .map((el) => {
              return (
                <>
                  <div
                    key={el.id}
                    className="flex flex-wrap justify-center gap-4 mx-auto p-4"
                  >
                    {language === "english" && (
                      <Form
                        word={el as IWord}
                        idToEdit={idToEdit}
                        methodType="PUT"
                      />
                    )}
                    {language === "japanese" && (
                      <JForm
                        word={el as IJWord}
                        idToEdit={idToEdit}
                        methodType="PUT"
                      />
                    )}
                    {language === "spanish" && (
                      <SForm
                        word={el as ISWord}
                        idToEdit={idToEdit}
                        methodType="PUT"
                      />
                    )}
                  </div>
                </>
              );
            })}
        </div>
      )}
      {/* Delete Confirmation Modal */}

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        wordId={idToDelete || undefined}
        word={
          (wordsList as IWord[]).find((el) => el.id === idToDelete)?.word ||
          (wordsList as IJWord[]).find((el) => el.id === idToDelete)?.word ||
          (wordsList as ISWord[]).find((el) => el.id === idToDelete)?.word ||
          "" // Default to empty string if word is not found
        }
        setInputValue={setInputValue}
      />
    </div>
  );
};

export default SearchResults;
