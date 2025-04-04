import { useState, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { ISForm, ISWord } from "../../../types/types-spanish";
import { MyGlobalContext } from "../../App";
import { IWord } from "../../../types/types-english";
import { IJWord } from "../../../types/types-japanese";

export type FormValues = {
  word: string | null;
  definition: string | null;
  example: string | null;
  present: string | null;
  past: string | null;
  conditional: string | null;
  subjunctive: string | null;
  future: string | null;
  imperfect: string | null;
  continuousProgressive: string | null;
  mark: boolean | null;
};

type WordList = {
  english: IWord[];
  japanese: IJWord[];
  spanish: ISWord[];
};

export const addWord = (
  language: "english" | "japanese" | "spanish",
  word: IWord | IJWord | ISWord
) => {
  const { languagesState, setLanguagesState } = useContext(MyGlobalContext);

      setLanguagesState({
        ...languagesState,
        [language]: {
          ...languagesState[language],
          wordsList: [
            ...(languagesState[language].wordsList as WordList[typeof language]),
            word as IWord,
          ],
          addWord: false,
        },
      });
};

const updateWord = (
  language: "english" | "japanese" | "spanish",
  word: IWord | IJWord | ISWord
) => {
  const { languagesState, setLanguagesState } = useContext(MyGlobalContext);

      setLanguagesState({
        ...languagesState,
        [language]: {
          ...languagesState[language],
          wordsList: [
            ...(languagesState[language].wordsList as WordList[typeof language]),
            word as IWord,
          ],
          // addWord: false,
          editWordMode: false,
          // showResults: false
        },
      });

};

const cancel = (language: "english" | "japanese" | "spanish") => {
  const { languagesState, setLanguagesState } = useContext(MyGlobalContext);

  setLanguagesState({
    ...languagesState,
    [language]: {
      ...languagesState[language],
      addWord: false,
      editWordMode: false,
    },
  });
};

const keyUp = (language: "english" | "japanese" | "spanish") => {
  const { languagesState, setLanguagesState } = useContext(MyGlobalContext);

  setLanguagesState({
    ...languagesState,
    [language]: {
      ...languagesState[language],
      showResults: false,
      addWord: false,
    },
  });
};

 const updateState = (
  language: "english" | "japanese" | "spanish",
  updates: { [key: string]: string | boolean }
) => {
  const { languagesState, setLanguagesState } = useContext(MyGlobalContext);
  setLanguagesState({
    ...languagesState,
    [language]: {
      ...languagesState[language],
      ...updates,
    },
  });
};


const SForm = ({ sDefaults, sMethodType, sIdToEdit }: ISForm) => {
  const { languagesState, setLanguagesState } = useContext(MyGlobalContext);

  const { register, handleSubmit, reset, setFocus } = useForm<FormValues>({
    defaultValues: {
      word: sDefaults?.defaultWord,
      definition: sDefaults?.defaultDefinition,
      example: sDefaults?.defaultExample,
      present: sDefaults?.defaultPresent,
      past: sDefaults?.defaultPast,
      conditional: sDefaults?.defaultConditional,
      subjunctive: sDefaults?.defaultSubjunctive,
      future: sDefaults?.defaultFuture,
      imperfect: sDefaults?.defaultImperfect,
      continuousProgressive: sDefaults?.defaultContinuousProgressive,
      mark: sDefaults?.defaultMark,
    },
  });
  // useState(() => {
  //   setFocus("word");
  // });
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // console.log(data);

    const sWord = {
      id: uuidv4(),
      word: data.word,
      definition: data.definition,
      example: data.example,
      present: data.present,
      past: data.past,
      conditional: data.conditional,
      subjunctive: data.subjunctive,
      future: data.future,
      imperfect: data.imperfect,
      continuousProgressive: data.continuousProgressive,
      mark: data.mark,
    };

    if (sMethodType === "POST") {
      // Send data to the backend via POST
      try {
        // await fetch(`http://localhost:${SERVERPORT}/spanish-words`, {
        //   method: "POST",
        //   mode: "cors",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(sWord), // body data type must match "Content-Type" header
        // });
        // Clear form inputs
        reset();

        addWord("spanish", sWord as ISWord);
      } catch (err) {
        console.log(err);
      }
    }

    if (sMethodType === "PUT") {
      // Send data to the backend via POST
      try {
        const sDataWithId = { id: sIdToEdit, ...data };
        // const res = await fetch(
        //   `http://localhost:${SERVERPORT}/spanish-words/${sIdToEdit}`,
        //   {
        //     method: "PUT",
        //     // mode: "cors",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     // body data type must match "Content-Type" header
        //     body: JSON.stringify(dataWithId),
        //   }
        // );
        // const res_data = await res.json();
        // const result = {
        //   status: res.status + "-" + res.statusText,
        //   headers: { "Content-Type": res.headers.get("Content-Type") },
        //   data: res_data,
        // };
        // Clear form inputs
        reset();

        updateWord("spanish", sDataWithId as ISWord);
      } catch (err) {
        console.log(err);
      }
    }
    // Get updated words list from json server
    // const getWords = async () => {
    //   const data = await fetch(`http://localhost:${SERVERPORT}/spanish-words`);
    //   const words = await data.json();
    //   setSWordsList(words);
    // };
    // getWords();
  };

  const onCancel = () => {
    cancel("spanish");
  };

  return (
    <div>
      <form
        className="flex flex-col gap-2 mb-8 mx-auto text-slate-100 text-2xl py-4 px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center justify-end gap-4">
          <label>Word: </label>
          <input
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
            {...register("word", {
              required: "Please enter a word.",
            })}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <label>Definition:</label>
          <input
            {...register("definition", {
              // required: "Please enter a definition.",
            })}
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <label>Example:</label>
          <textarea
            className="px-2 py-1 border border-white w-80 text-slate-700 h-[150px] bg-slate-200 rounded outline-none"
            {...register("example", {
              // required: "Please enter an example.",
            })}
          />
        </div>

        <div className="flex items-center justify-end gap-4">
          <label>Present:</label>
          <input
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
            {...register("present", {
              // required: "Please enter a pronunciation.",
            })}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <label>Past:</label>
          <input
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
            {...register("past", {
              // required: "Please enter a pronunciation.",
            })}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <label>Conditional:</label>
          <input
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
            {...register("conditional", {
              // required: "Please enter a pronunciation.",
            })}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <label>Subjunctive:</label>
          <input
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
            {...register("subjunctive", {
              // required: "Please enter a pronunciation.",
            })}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <label>Future:</label>
          <input
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
            {...register("future", {
              // required: "Please enter a pronunciation.",
            })}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <label>Imperfect:</label>
          <input
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
            {...register("imperfect", {
              // required: "Please enter a pronunciation.",
            })}
          />
        </div>
        <div className="flex items-stretch justify-end gap-4">
          <label>
            Continuous <br />
            Progressive:
          </label>
          <input
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
            {...register("continuousProgressive", {
              // required: "Please enter a pronunciation.",
            })}
          />
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <label className="text-slate-200">Important:</label>
          <div className="w-80 py-1 text-center">
            <input
              type="checkbox"
              className="h-6 w-6 text-xl my-1 border border-white text-blue-700
            focus:ring-2 focus:ring-blue-500 rounded-sm focus:ring-offset-gray-700 text-center"
              {...register("mark", {
                // required: "Mark important?",
              })}
            />
          </div>
        </div>
        <hr />

        <div className="flex gap-2 justify-end flex-end">
          <input
            type="submit"
            value="Save"
            className="w-1/2 py-2 my-1 text-2xl text-center bg-blue-300 border rounded-md cursor-pointer border-slate-100 text-slate-800 hover:opacity-95"
          />
          <input
            type="button"
            className="w-1/2 py-2 my-1 text-2xl text-center bg-red-300 border rounded-md
            cursor-pointer border-slate-100 text-slate-800 hover:opacity-95"
            value="Cancel"
            onClick={onCancel}
          />
        </div>
      </form>
    </div>
  );
};

export default SForm;
