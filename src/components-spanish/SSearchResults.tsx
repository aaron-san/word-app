import { useState, useContext } from "react";
import { ISDefaults } from "../types-spanish";
import AddSWord from "./AddSWord";
import SForm from "./SForm";
import { MyGlobalContext } from "../App";

const SSearchResults = () => {
  const {
    sWordsList,
    setSWordsList,
    searchSWord,
    showSResults,
    editSWordMode,
    setEditSWordMode,
    sIdToEdit,
    setSIdToEdit,
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
      await fetch(`http://localhost:3000/spanish-words/${id}`, {
        method: "DELETE",
      });

      // Get updated words list from json server
      const getSWords = async () => {
        const data = await fetch("http://localhost:3000/spanish-words");
        const words = await data.json();
        setSWordsList(words);
      };
      getSWords();
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

  return (
    <div className="w-fill mx-auto p-4  mt-4 max-h-[400px] overflow-auto ">
      <div className="flex flex-col justify-start gap-4 ">
        <div className="flex items-start justify-center gap-4"></div>
        <AddSWord />
      </div>
      {/* Search Results */}
      {showSResults && (
        <div className="flex justify-center gap-2 mt-4 w-[700px]">
          {!editSWordMode && (
            <div className="flex flex-wrap gap-4 justify-center min-w-[300px] mx-auto">
              {sWordsList
                ?.filter((d) => {
                  const wordLowerCase = d.word?.toLowerCase();
                  const flattenedSearchSWord = searchSWord
                    .toLowerCase()
                    .replaceAll("á", "a")
                    .replaceAll("é", "e")
                    .replaceAll("í", "i")
                    .replaceAll("ó", "o")
                    .replaceAll("ú", "u")
                    .replaceAll("ü", "u")
                    .replaceAll("ñ", "n");

                  return searchSWord
                    ? wordLowerCase.includes(searchSWord.toLowerCase()) ||
                        wordLowerCase.includes(flattenedSearchSWord)
                    : "";
                })
                .map((e) => {
                  // Return editable input fields
                  return (
                    <div
                      key={e.id}
                      className={`border rounded-md border-slate-200 max-w-[340px] flex justify-start flex-wrap flex-col mx-auto min-w-[200px] ${
                        e.mark ? "bg-blue-600/60" : "bg-slate-600/60"
                      } h-fit cursor-pointer`}
                    >
                      <div
                        onClick={() => {
                          setSIdToEdit(e.id);
                          setEditSWordMode(!editSWordMode);
                        }}
                      >
                        <div className="p-2 text-xl border-b border-1 w-fill text-slate-900 border-slate-200 bg-slate-100/80 rounded-t-md">
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

                        {e.example && (
                          <>
                            <div className="px-2 my-2 text-lg text-gray-100">
                              {e.example}
                            </div>
                            <div className="w-[90%] h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent my-2"></div>
                          </>
                        )}
                        {e.present && (
                          <>
                            <div className="px-2 my-2 text-lg text-pink-100">
                              {e.present}
                            </div>
                            <div className="flex items-center justify-between"></div>
                          </>
                        )}
                        {e.past && (
                          <>
                            <div className="px-2 my-2 text-lg text-pink-100">
                              {e.past}
                            </div>
                            <div className="flex items-center justify-between"></div>
                          </>
                        )}
                        {e.conditional && (
                          <>
                            <div className="px-2 my-2 text-lg text-pink-100">
                              {e.conditional}
                            </div>
                            <div className="flex items-center justify-between"></div>
                          </>
                        )}
                        {e.subjunctive && (
                          <>
                            <div className="px-2 my-2 text-lg text-pink-100">
                              {e.subjunctive}
                            </div>
                            <div className="flex items-center justify-between"></div>
                          </>
                        )}
                        {e.future && (
                          <>
                            <div className="px-2 my-2 text-lg text-pink-100">
                              {e.future}
                            </div>
                            <div className="flex items-center justify-between"></div>
                          </>
                        )}
                        {e.imperfect && (
                          <>
                            <div className="px-2 my-2 text-lg text-pink-100">
                              {e.imperfect}
                            </div>
                            <div className="flex items-center justify-between"></div>
                          </>
                        )}
                        {e.continuousProgressive && (
                          <>
                            <div className="px-2 my-2 text-lg text-pink-100">
                              {e.continuousProgressive}
                            </div>
                            <div className="flex items-center justify-between"></div>
                          </>
                        )}
                      </div>
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
          {editSWordMode &&
            sWordsList
              .filter((el) => el.id === sIdToEdit)
              .map((el) => {
                const defaults: ISDefaults = {
                  defaultWord: el.word,
                  defaultDefinition: el.definition,
                  defaultExample: el.example,
                  defaultPresent: el.present,
                  defaultPast: el.past,
                  defaultConditional: el.conditional,
                  defaultSubjunctive: el.subjunctive,
                  defaultFuture: el.future,
                  defaultImperfect: el.imperfect,
                  defaultContinuousProgressive: el.continuousProgressive,
                  defaultMark: el.mark,
                };

                return (
                  <div key={el.id} className="">
                    <SForm sDefaults={defaults} sMethodType="PUT" />
                  </div>
                );
              })}
        </div>
      )}
    </div>
  );
};

export default SSearchResults;
