import React, { useEffect, useRef, useState, useContext } from "react";
import { IDefaults, IWord, IWords } from "../types-english";
import AddWord from "./AddWord";
// import { v4 as uuidv4 } from "uuid";
import Form from "./Form";
import { MyGlobalContext, SERVERPORT } from "../App";

const SearchResults = () => {
  const {
    addWord,
    wordsList,
    setWordsList,
    searchWord,
    showResults,
    editWordMode,
    setEditWordMode,
    idToEdit,
    setIdToEdit,
  } = useContext(MyGlobalContext);

  const searchRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   searchRef.current?.focus();
  // }, []);

  const handleDelete = async (word: string, id: string) => {
    const deleteWord = window.prompt(
      `Delete ${word}? \n\nType 'DELETE' to delete`
    );
    if (deleteWord !== "DELETE") return;
    // Delete data on the backend via PUT
    try {
      await fetch(`http://localhost:${SERVERPORT}/english-words/${id}`, {
        method: "DELETE",
      });

      // Get updated words list from json server
      const getWords = async () => {
        const data = await fetch(
          `http://localhost:${SERVERPORT}/english-words`
        );
        const words = await data.json();
        setWordsList(words);
      };
      getWords();
    } catch (err) {
      console.log(err);
    }
  };

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

  return (
    <div className="max-h-[400px] overflow-auto rounded bg-slate-700 ">
      {addWord && <AddWord />}
      {/* Search Results */}
      {showResults && (
        <div className="flex justify-center max-w-[600px]">
          {!editWordMode && (
            <div className="flex flex-wrap gap-4 justify-center mx-auto">
              {wordsList
                ?.filter((d) => {
                  return searchWord
                    ? d.word?.toLowerCase().includes(searchWord.toLowerCase())
                    : "";
                })
                .map((e) => {
                  // Return editable input fields
                  return (
                    <div
                      key={e.id}
                      className={`border rounded-md border-slate-200 flex flex-wrap flex-col mx-auto w-[280px] ${
                        e.mark ? "bg-blue-600/60" : "bg-slate-600/60"
                      } h-fit cursor-pointer`}
                      onClick={() => {
                        setIdToEdit(e.id);
                        setEditWordMode(!editWordMode);
                      }}
                    >
                      <div className="p-2 text-xl tracking-wider border-b border-1 w-fill text-slate-900 border-slate-200 bg-slate-100/80 rounded-t-md">
                        {e.word}
                      </div>
                      {/* <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent my-2 px-2"></div> */}
                      {e.definition && (
                        <>
                          <div className="px-2 my-2 text-lg text-yellow-100">
                            {e.definition}
                          </div>
                          <div className="w-[90%] h-[1px] px-2 bg-gradient-to-r from-transparent via-slate-200 to-transparent my-2"></div>
                        </>
                      )}

                      {e.pronunciation && (
                        <>
                          <div className="px-2 my-2 text-lg text-gray-100">
                            {e.pronunciation}
                          </div>
                          <div className="w-[90%] h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent my-2"></div>
                        </>
                      )}

                      {e.example && (
                        <>
                          <div className="px-2 my-2 text-lg text-pink-100">
                            {e.example}
                          </div>
                          <div className="flex items-center justify-between"></div>
                        </>
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
                          onClick={() => handleDelete(e.word, e.id)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
          {/* Form - Edit Word */}
          {editWordMode &&
            wordsList
              .filter((el) => el.id === idToEdit)
              .map((el) => {
                const defaults: IDefaults = {
                  defaultWord: el.word,
                  defaultDefinition: el.definition,
                  defaultPronunciation: el.pronunciation,
                  defaultExample: el.example,
                  defaultMark: el.mark,
                };

                return (
                  <div key={el.id} className="p-8">
                    <Form
                      defaults={defaults}
                      idToEdit={idToEdit}
                      methodType="PUT"
                    />
                  </div>
                );
              })}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
