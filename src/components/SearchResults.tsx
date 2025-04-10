import { useRef, useContext, useState } from "react";
import { IDefaults, IWord } from "../../types/types-english";
// import AddWord from "./AddWord";
// import { v4 as uuidv4 } from "uuid";
import Form from "./english/Form";
import JForm from "./japanese/JForm";
import SForm from "./spanish/SForm";
import { MyGlobalContext } from "../App";
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
  };

  const confirmDelete = () => {
    if (idToDelete && inputValue === "DELETE") {
      // Handle the delete logic
      updateState({
        wordsList: (() => {
          if (language === "english") {
            return (wordsList as IWord[]).filter((el) => el.id !== idToDelete);
          } else if (language === "japanese") {
            return (wordsList as IJWord[]).filter((el) => el.id !== idToDelete);
          } else if (language === "spanish") {
            return (wordsList as ISWord[]).filter((el) => el.id !== idToDelete);
          }
          return []; // Return an empty array if the language doesn't match any case
        })(),
        editWordMode: false,
        showResults: false,
        addWord: false,
      });
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

  // const handleDelete = (word: string, id: string) => {
  //   const deleteWord = window.prompt(
  //     `Delete ${word}? \n\nType 'DELETE' to delete`
  //   );
  // if (deleteWord !== "DELETE") return;
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
    <div className="max-h-[600px] overflow-auto rounded bg-slate-700 ">
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
          <div className="flex p-8 w-60 text-white justify-center items-center">
            No results...
          </div>
        )}
      {showResults && !editWordMode && (
        <div className="flex max-w-[680px] mx-auto">
          <div className="flex flex-wrap gap-4 justify-center mx-auto p-4">
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
                  <div className="p-2 text-xl tracking-wider border-b border-1 w-fill text-slate-900 border-slate-200 bg-slate-100/80 rounded-t-md">
                    {el.word}
                  </div>
                  {/* <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent my-2 px-2"></div> */}
                  {"definition" in el && el.definition && (
                    <>
                      <div className="px-2 my-2 text-lg text-yellow-100">
                        {el.definition}
                      </div>
                      <div className="w-[90%] h-[1px] px-2 bg-gradient-to-r from-transparent via-slate-200 to-transparent my-2"></div>
                    </>
                  )}

                  {"pronunciation" in el && el.pronunciation && (
                    <>
                      <div className="px-2 my-2 text-lg text-gray-100">
                        {el.pronunciation}
                      </div>
                      <div className="w-[90%] h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent my-2"></div>
                    </>
                  )}

                  {el.example && (
                    <div className="px-2 my-2 text-lg text-pink-100">
                      {el.example}
                    </div>
                    // <div className="flex items-center justify-between"></div>
                  )}

                  <div className="flex items-center justify-end gap-2 px-2">
                    {/* <button
                        className="px-4 py-1 m-4 max-w-[100px] w-[80%] border border-slate-100 text-slate-100 rounded-md hover:bg-slate-600"
                        onClick={() => {
                          setIdToEdit(e.id);
                          setEditWordMode(!editWordMode);
                        }}
                      >
                        Edit
                      </button> */}
                    <button
                      className="w-8 h-8 px-2 py-1 m-1 my-3 text-sm text-red-200 border border-red-200 rounded-full hover:bg-slate-600"
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
        <div className="flex max-w-[680px] mx-auto">
          {(wordsList as (IWord | IJWord | ISWord)[])
            .filter((el) => el.id === idToEdit)
            .map((el) => {
              return (
                <>
                  <div
                    key={el.id}
                    className="flex flex-wrap gap-4 justify-center mx-auto p-4"
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
