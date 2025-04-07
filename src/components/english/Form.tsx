import React, { useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { IForm, IWord } from "../../../types/types-english";
import { MyGlobalContext } from "../../App";
import { ISWord } from "../../../types/types-spanish";
import { IJWord } from "../../../types/types-japanese";

export type FormValues = {
  word: string | null;
  definition: string | null;
  pronunciation: string | null;
  example: string | null;
  mark: boolean | null;
};

type WordList = {
  english: IWord[];
  japanese: IJWord[];
  spanish: ISWord[];
};

const Form = ({ language, defaults, methodType, idToEdit }: IForm) => {
  const { languagesState, setLanguagesState } = useContext(MyGlobalContext);

  // Type the wordsList based on the current language
  const wordsList = languagesState[language].wordsList as
    | IWord[]
    | IJWord[]
    | ISWord[];

  const updateState = (updates: { [key: string]: string | boolean }) => {
    setLanguagesState({
      ...languagesState,
      [language]: {
        ...languagesState[language],
        ...updates,
      },
    });
  };

  const addWord = (word: IWord | IJWord | ISWord) => {
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

  const updateWord = (word: IWord | IJWord | ISWord) => {
    setLanguagesState({
      ...languagesState,
      [language]: {
        ...languagesState[language],
        wordsList: [
          ...(wordsList as (IWord | IJWord | ISWord)[]).filter(
            (word: IWord | IJWord | ISWord) => word.id !== idToEdit
          ),
          word,
        ],
        editWordMode: false,
        showResults: false,
      },
    });
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
      reset();
      const wordsOnly = wordsList.map((word) => word.word);
      if (word.word && !wordsOnly.includes(word.word)) {
        addWord(word as IWord | IJWord | ISWord);
      } else {
        console.log("Please provide a new word.");
      }
    }

    if (methodType === "PUT") {
      try {
        const dataWithId = { id: idToEdit, ...data };
        reset();
        updateWord(dataWithId as IWord | IJWord | ISWord);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-2 mb-8 mx-auto text-slate-100 text-xl py-4 px-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col justify-end gap-1 text-md">
        <label>Word: </label>
        <textarea
          className="px-2 py-1 border border-white w-80 text-slate-700 h-12 bg-slate-200 rounded outline-none"
          {...register("word", { required: "Please enter a word." })}
        />
      </div>

      <div className="flex flex-col justify-end gap-1 text-md">
        <label>Definition:</label>
        <textarea
          {...register("definition")}
          className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
        />
      </div>
      <div className="flex flex-col justify-end gap-1 text-md">
        <label>Pronunciation:</label>
        <input
          className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
          {...register("pronunciation")}
        />
      </div>
      <div className="flex flex-col justify-end gap-1 text-md">
        <label>Example:</label>
        <textarea
          className="px-2 py-1 border border-white w-80 text-slate-700 h-32 scrollbar-hidden overflow-auto bg-slate-200 rounded outline-none"
          {...register("example")}
        />
      </div>
      <div className="flex flex-col justify-end gap-1 text-md">
        <label className="text-slate-200">Important:</label>
        <div className="w-10 py-1 text-center">
          <input
            type="checkbox"
            className="h-6 w-6 text-xl my-1 border border-white text-blue-700
            focus:ring-2 focus:ring-blue-500 rounded focus:ring-offset-gray-700 text-center bg-slate-200 outline-none"
            {...register("mark")}
          />
        </div>
      </div>
      <hr />
      <div className="flex gap-2 justify-between flex-end text-xl">
        <input
          type="submit"
          value="Save"
          className="w-1/2 py-2 my-1 text-center bg-blue-300 border rounded-md cursor-pointer border-slate-100 text-slate-800 hover:opacity-95"
        />
        <input
          type="button"
          className="w-1/2 py-2 my-1 text-center bg-red-300 border rounded-md cursor-pointer border-slate-100 text-slate-800 hover:opacity-95"
          value="Cancel"
          onClick={onCancel}
        />
      </div>
    </form>
  );
};

export default Form;
