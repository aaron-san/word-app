import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { IDefaults, IForm } from "../types-english";

export type FormValues = {
  word: string | null;
  definition: string | null;
  pronunciation: string | null;
  example: string | null;
  mark: boolean | null;
};

const Form = ({
  setWordsList,
  setAddWord,
  setEditWordMode,
  setSearchWord,
  defaults,
  methodType,
  idToEdit,
  showResults,
  setShowResults,
}: IForm) => {
  //   console.log(defaults);

  const { register, handleSubmit, reset, setFocus } = useForm<FormValues>({
    defaultValues: {
      word: defaults?.defaultWord,
      definition: defaults?.defaultDefinition,
      pronunciation: defaults?.defaultPronunciation,
      example: defaults?.defaultExample,
      mark: defaults?.defaultMark,
    },
  });
  useState(() => {
    setFocus("word");
  });
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // console.log(data);
    // console.log("Add Word: ", searchWord);
    const word = {
      id: uuidv4(),
      word: data.word,
      mark: data.mark,
      definition: data.definition,
      pronunciation: data.pronunciation,
      example: data.example,
    };

    if (methodType === "POST") {
      // Send data to the backend via POST
      try {
        fetch("http://localhost:3000/english-words", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(word), // body data type must match "Content-Type" header
        });
        // Clear form inputs
        reset();

        setAddWord(false);
      } catch (err) {
        console.log(err);
      }
    }

    if (methodType === "PUT") {
      // Send data to the backend via POST
      try {
        // console.log(idToEdit);
        const dataWithId = { id: idToEdit, ...data };
        const res = await fetch(
          `http://localhost:3000/english-words/${idToEdit}`,
          {
            method: "PUT",
            // mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            // body data type must match "Content-Type" header
            body: JSON.stringify(dataWithId),
          }
        );
        const res_data = await res.json();
        const result = {
          status: res.status + "-" + res.statusText,
          headers: { "Content-Type": res.headers.get("Content-Type") },
          data: res_data,
        };
        // Clear form inputs
        reset();

        if (setEditWordMode) setEditWordMode(false);
      } catch (err) {
        console.log(err);
      }
    }
    // Get updated words list from json server
    const getWords = async () => {
      const data = await fetch("http://localhost:3000/english-words");
      const words = await data.json();
      setWordsList(words);
    };
    getWords();
    setShowResults(true);
  };

  const onCancel = () => {
    setAddWord(false);
    if (setEditWordMode) setEditWordMode(false);
    // if (setSearchWord) setSearchWord("");
    setShowResults(true);
  };

  return (
    <div>
      <form
        className="flex flex-col max-w-[420px] gap-4 myb-8 mx-auto text-slate-100 text-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center justify-between gap-4">
          <label>Word: </label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("word", {
              required: "Please enter a word.",
            })}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <label>Definition:</label>
          <input
            {...register("definition", {
              // required: "Please enter a definition.",
            })}
            className="px-2 py-1 border border-white w-60 text-slate-700"
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label>Pronunciation:</label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("pronunciation", {
              // required: "Please enter a pronunciation.",
            })}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label>Example:</label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("example", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-start gap-4">
          <label>Important ?</label>
          <input
            type="checkbox"
            className="w-8 h-8 px-2 py-1 border border-white ml-[130px] text-slate-700"
            {...register("mark", {
              // required: "Mark important?",
            })}
          />
        </div>
        <hr />
        <input
          type="submit"
          value="Save"
          className="w-full py-2 mx-auto text-2xl text-center bg-blue-300 border rounded-md cursor-pointer border-slate-100 text-slate-800"
        />
      </form>
      <button
        className="w-full py-2 mx-auto my-4 text-2xl text-center bg-red-300 border rounded-md border-slate-100 text-slate-800"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
};

export default Form;
