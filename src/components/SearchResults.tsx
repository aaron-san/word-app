import { useRef, useContext, useState } from "react";
import { IDefaults, IWord } from "../../types/types-english";
// import AddWord from "./AddWord";
// import { v4 as uuidv4 } from "uuid";
import Form from "./english/Form";
import JForm from "./japanese/JForm";
import SForm from "./spanish/SForm";
import { MyGlobalContext } from "../App";
import { SERVERPORT } from "../utils/constants";
import { IJWord } from "../../types/types-japanese";
import { ISWord } from "../../types/types-spanish";
import React from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { sendDeleteRequest } from "../utils/functions";

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
        sendDeleteRequest({ language: `${language}`, idToDelete: idToDelete });

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

  const partsToInclude = ["japanese", "english", "definition"];

  // a helper that narrows the type safely
  // <T extends object>  -->   Generic type T must be an object
  // key: keyof any      -->   Accepts any string/number/symbol key
  // key is keyof T      -->   Type predicate — tells TypeScript: “If this returns
  //                           true, treat key as a valid key of T

  function hasKey<T extends object>(obj: T, key: keyof any): key is keyof T {
    // check if a given key exists in an object obj
    return key in obj;
  }

  const getCustomStyles = (part: string) => {
    switch (part) {
      case "english":
        return "text-green-200";
      case "definition":
        return "text-amber-300";
      case "japanese":
        return "font-notojp font-optical-auto font-[300] not-italic text-yellow-100 text-6xl";
        break;
      case "example":
        return "text-pink-100";
      default:
        return "text-gray-100";
    }
  };

  const lowerSearchWord = searchWord?.toLowerCase() || "";

  const filteredWords = (() => {
    if (language === "english") {
      return (wordsList as IWord[])
        .filter((d) => {
          return (
            searchWord &&
            (d.word?.toLowerCase().includes(lowerSearchWord) ||
              d.definition?.toLowerCase().includes(lowerSearchWord))
          );
        })
        .sort((a, b) => (a.word.length < b.word.length ? -1 : 1));
    } else if (language === "japanese") {
      return (wordsList as IJWord[])
        .filter((d) => {
          return (
            searchWord &&
            (d.word?.toLowerCase().includes(lowerSearchWord) ||
              d.english?.toLowerCase().includes(lowerSearchWord) ||
              d.japanese?.toLowerCase().includes(lowerSearchWord))
          );
        })
        .sort((a, b) => {
          const aIncludes = a.word?.toLowerCase().includes(lowerSearchWord)
            ? 1
            : 0;
          const bIncludes = b.word?.toLowerCase().includes(lowerSearchWord)
            ? 1
            : 0;

          // First priority: whether it includes lowerSearchWord
          if (aIncludes !== bIncludes) {
            return bIncludes - aIncludes; // items that include come first
          }

          // Second priority: word length
          return a.word.length - b.word.length;
        });
    } else if (language === "spanish") {
      return (wordsList as ISWord[])
        .filter((d) => {
          return (
            searchWord &&
            (d.word?.toLowerCase().includes(lowerSearchWord) ||
              fuzzyMatch(lowerSearchWord, d.word?.toLowerCase() || "")) &&
              d.word?.length! > lowerSearchWord.length - 1
              ||
            (
              d.definition?.toLowerCase().includes(lowerSearchWord))
          );
        })
        .sort((a, b) => (a.word.length < b.word.length ? -1 : 1));
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
                  className={`border rounded-md flex flex-wrap flex-col mx-auto w-[280px] border-slate-100/30 ${
                    el.mark ? "bg-emerald-600/60" : "bg-slate-600/60 "
                  } h-fit cursor-pointer`}
                  onClick={() => {
                    updateState({
                      idToEdit: el.id,
                      editWordMode: true,
                    });
                  }}
                >
                  <div className="flex justify-between bg-slate-100/80 p-2 border-1 border-slate-200 border-b rounded-t-md w-fill">
                  <div className="text-slate-900 text-xl tracking-wider">
                    {el.word}
                  </div>
                  {"group" in el && el.group && <div className="self-center mr-2 ml-2 text-slate-700 text-base">({el.group})</div>}
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
                      className="hover:opacity-80 m-1 my-3 p-1/2 border border-red-200/80 rounded-lg w-6 h-6 overflow-hidden text-red-200 text-sm"
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
        <div className="flex mx-auto w-fit max-w-[680px]">
          {(wordsList as (IWord | IJWord | ISWord)[])
            .filter((el) => el.id === idToEdit)
            .map((el) => {
              return (
                <div key={el.id}>
                  <div className="flex flex-wrap justify-center gap-4 mx-auto p-4">
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
                </div>
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

function normalize(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function fuzzyMatch(typed: string, candidate: string): boolean {
  typed = normalize(typed);
  candidate = normalize(candidate);

  let i = 0; // typed
  let j = 0; // candidate
  let misses = 0;

  while (i < typed.length && j < candidate.length) {
    if (typed[i] === candidate[j]) {
      i++;
      j++;
    } else {
      j++; // skip candidate letters until we find a match
    }
  }

  // Remaining typed letters were not found
  misses += typed.length - i;

  return misses <= 1;
}




export default SearchResults;
