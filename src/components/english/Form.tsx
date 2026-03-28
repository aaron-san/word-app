// import * as dotenv from "dotenv";
// dotenv.config();
import React, { useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { IDefaults, IForm, IWord } from "../../../types/types-english";
import { MyGlobalContext } from "../../App";
// import { send } from "process";
import { sendPostRequest, sendPutRequest } from "../../utils/functions";

export type FormValues = {
  word: string | null;
  definition: string | null;
  pronunciation: string | null;
  example: string | null;
  mark: boolean | null;
};

const Form = ({ word, methodType, idToEdit }: IForm) => {
  const { languagesState, setLanguagesState } = useContext(MyGlobalContext);

  // const environment = import.meta.env.VITE_ENVIRONMENT;
  // console.log(environment);
  const language = "english";
  const wordsList = languagesState[language].wordsList as IWord[];

  const defaults: IDefaults = {
    defaultWord: word?.word || languagesState[language].searchWord || "",
    defaultDefinition: word?.definition || "",
    defaultPronunciation: word?.pronunciation || "",
    defaultExample: word?.example || "",
    defaultMark: word?.mark || false,
  };

  const updateState = (updates: { [key: string]: string | boolean }) => {
    setLanguagesState({
      ...languagesState,
      [language]: {
        ...languagesState[language],
        ...updates,
      },
    });
  };

  const addWord = (word: IWord) => {
    setLanguagesState({
      ...languagesState,
      [language]: {
        ...languagesState[language],
        wordsList: [...wordsList, word],
        addWord: false,
        showResults: false,
      },
    });
  };

  const updateWord = (word: IWord) => {
    setLanguagesState({
      ...languagesState,
      [language]: {
        ...languagesState[language],
        wordsList: [
          ...(wordsList as IWord[]).filter(
            (word: IWord) => word.id !== idToEdit
          ),
          word,
        ],
        editWordMode: false,
        // showResults: true,
      },
    });
    sendPutRequest({language: "english", word });
  };

  const onCancel = () => {
    setLanguagesState({
      ...languagesState,
      [language]: {
        ...languagesState[language],
        addWord: false,
        editWordMode: false,
      },
    });
  };

  const { register, handleSubmit, reset, setFocus } = useForm<FormValues>({
    defaultValues: {
      word: defaults?.defaultWord,
      definition: defaults?.defaultDefinition,
      pronunciation: defaults?.defaultPronunciation,
      example: defaults?.defaultExample,
      mark: defaults?.defaultMark,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    updateState({
      searchWord: "",
      editWordMode: false,
    });

    const word = {
      id: uuidv4(),
      word: data.word,
      mark: data.mark,
      definition: data.definition,
      pronunciation: data.pronunciation,
      example: data.example,
    };

    if (methodType === "POST") {
      try {
        // Add word
        sendPostRequest({ word: word as IWord, language: "english" });
        reset();
        const wordsOnly = wordsList.map((word) => word.word);
        if (word.word && !wordsOnly.includes(word.word)) {
          addWord(word as IWord);
        } else {
          console.log("Please provide a new word.");
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (methodType === "PUT") {
      // Send data to the backend via PUT to modify a resource
      const dataWithId = { id: idToEdit, ...data };
      try {
        // sendPutRequest({ word: dataWithId as IWord, language: "english" });

        updateWord(dataWithId as IWord);
        reset();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-2 mx-auto mb-8 px-4 py-4 text-slate-100 text-xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col justify-end gap-1 text-md">
        <div className="flex justify-between">

        <label className="py-1 text-sm">Word:</label>
        <div className="flex justify-end gap-2">
        <label className="py-1 text-slate-200 text-sm">Important:</label>
        {/* <div className="py-1 w-10 text-center"> */}
        
          <input
            type="checkbox"
            className="inline bg-slate-200 my-1 border border-white rounded outline-none w-6 h-6 text-blue-700 text-xl text-center accent-teal-300 cursor-pointer"
            {...register("mark")}
          />
        </div>
        {/* </div> */}
      </div>
        <textarea
          className="bg-slate-200 px-2 py-1 border border-white rounded outline-none w-80 h-10 text-slate-700"
          {...register("word", { required: "Please enter a word." })}
        />
      </div>

      <div className="flex flex-col justify-end gap-1 text-md">
        <label className="text-sm">Definition:</label>
        <textarea
          {...register("definition")}
          className="bg-slate-200 px-2 py-1 border border-white rounded outline-none w-80 text-slate-700"
        />
      </div>
      <div className="flex flex-col justify-end gap-1 text-md">
        <label className="text-sm">Pronunciation:</label>
        <input
          className="bg-slate-200 px-2 py-1 border border-white rounded outline-none w-80 text-slate-700"
          {...register("pronunciation")}
        />
      </div>
      <div className="flex flex-col justify-end gap-1 text-md">
        <label className="text-sm">Example:</label>
        <textarea
          className="scrollbar-hidden bg-slate-200 px-2 py-1 border border-white rounded outline-none w-80 h- overflow-auto text-slate-700 24"
          {...register("example")}
        />
      </div>
      
      <hr />
      <div className="flex flex-end justify-between gap-2 text-xl">
        <input
          type="submit"
          value="Save"
          className="bg-blue-300 hover:opacity-95 my-1 py-2 border border-slate-100 rounded-md w-1/2 text-slate-800 text-center cursor-pointer"
        />
        <input
          type="button"
          className="bg-red-300 hover:opacity-95 my-1 py-2 border border-slate-100 rounded-md w-1/2 text-slate-800 text-center cursor-pointer"
          value="Cancel"
          onClick={onCancel}
        />
      </div>
    </form>
  );
};

export default Form;
