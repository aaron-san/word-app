import React, { useEffect, useRef, useState, useContext } from "react";
import { IJDefaults, IJWord, IJWords } from "../types-japanese";
import JAddWord from "./AddJWord";
import JForm from "./JForm";
import { MyGlobalContext } from "../App";

const JSearchResults = () => {
  const {
    jWordsList,
    setJWordsList,
    searchJWord,
    setSearchJWord,
    showJResults,
    editJWordMode,
    setEditJWordMode,
    jIdToEdit,
    setJIdToEdit,
  } = useContext(MyGlobalContext);
  // const searchRef = useRef<HTMLInputElement>(null);

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
      await fetch(`http://localhost:3000/japanese-words/${id}`, {
        method: "DELETE",
      });

      // Get updated words list from json server
      const getJapaneseWords = async () => {
        const data = await fetch("http://localhost:3000/japanese-words");
        const jWords = await data.json();
        setJWordsList(jWords);
      };
      getJapaneseWords();
    } catch (err) {
      console.log(err);
    }
  };

  // Add throttle (delay) to onChange handler
  // const [filteredWords, setFilteredWords] = useState<IWord[]>([]);

  // const doWordFilter = (e: string) => {
  //   if (!e) return setFilteredWords([]);

  //   setTimeout(() => {
  //     console.log("====>", e);
  //     setFilteredWords(
  //       wordsList.filter((el) => el.word.toLowerCase().includes(searchWord))
  //     );
  //   }, 1);
  // };

  // const [addWord, setAddWord] = useState<boolean>(false);

  return (
    <div className="max-w-2xl mx-auto p-4  mt-4 max-h-[400px] overflow-auto ">
      <div className="flex flex-col justify-start gap-4 ">
        <div className="flex items-start justify-center gap-4"></div>
        <JAddWord />
      </div>
      {/* Search Results */}
      {showJResults && (
        <div className="flex justify-center gap-2 mt-4">
          {!editJWordMode && (
            <div className="flex flex-wrap w-[700px] gap-4 justify-center min-w-[300px] mx-auto">
              {jWordsList
                ?.filter((d) => {
                  return searchJWord
                    ? d.word?.toLowerCase().includes(searchJWord.toLowerCase())
                    : "";
                })
                .map((e) => {
                  // Return editable input fields
                  return (
                    <div
                      key={e.id}
                      className={`border rounded-md border-slate-200 max-w-[300px] flex justify-start flex-wrap flex-col mx-auto min-w-[200px] ${
                        e.mark ? "bg-blue-600/60" : "bg-slate-600/60"
                      } h-fit cursor-pointer`}
                    >
                      <div
                        onClick={() => {
                          setJIdToEdit(e.id);
                          setEditJWordMode(!editJWordMode);
                          // setSearchJWord("");
                        }}
                      >
                        <div className="p-2 text-xl border-b border-1 w-fill text-slate-900 border-slate-200 bg-slate-100/80 rounded-t-md">
                          {e.word}
                        </div>
                        {/* <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent my-2 px-2"></div> */}
                        {e.english && (
                          <>
                            <div className="px-2 my-2 text-lg text-yellow-100">
                              {e.english}
                            </div>
                            <div className="w-[90%] h-[1px] px-2 bg-gradient-to-r from-transparent via-slate-200 to-transparent my-2"></div>
                          </>
                        )}

                        {e.japanese && (
                          <>
                            <div className="px-2 my-2 text-lg text-gray-100">
                              {e.japanese}
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
                      </div>
                      <div className="flex items-center justify-end gap-2 px-2">
                        {/* <button
                        className="px-4 py-1 m-4 max-w-[100px] w-[80%] border border-slate-100 text-slate-100 rounded-md hover:bg-slate-600"
                        onClick={() => {
                          setJIdToEdit(e.id);

                          setEditJWordMode(!editJWordMode);
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
          {editJWordMode &&
            jWordsList
              .filter((el) => el.id === jIdToEdit)
              .map((el) => {
                const jDefaults: IJDefaults = {
                  defaultWord: el.word,
                  defaultEnglish: el.english,
                  defaultJapanese: el.japanese,
                  defaultExample: el.example,
                  defaultPresent: el.present,
                  defaultTeForm: el.teForm,
                  defaultNegative: el.negative,
                  defaultPast: el.past,
                  defaultPastNegative: el.pastNegative,
                  defaultPotential: el.potential,
                  defaultImperative: el.imperative,
                  defaultVolitional: el.volitional,
                  defaultGroup: el.group,
                  defaultDesirative: el.desirative,
                  defaultConditional: el.conditional,
                  defaultPassive: el.passive,
                  defaultCausative: el.causative,
                  defaultCausativePassive: el.causativePassive,
                  defaultHonorific: el.honorific,
                  defaultHumble: el.humble,
                  defaultMark: el.mark,
                };
                // console.log(defaults);

                return (
                  <div key={el.id} className="">
                    <JForm
                      jDefaults={jDefaults}
                      jIdToEdit={jIdToEdit}
                      jMethodType="PUT"
                    />
                  </div>
                );
              })}
        </div>
      )}
    </div>
  );
};

export default JSearchResults;
