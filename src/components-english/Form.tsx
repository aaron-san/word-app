import React, { useState, useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { IDefaults, IForm } from "../types-english";
import { MyGlobalContext, SERVERPORT } from "../App";

export type FormValues = {
  word: string | null;
  definition: string | null;
  pronunciation: string | null;
  example: string | null;
  mark: boolean | null;
};

const Form = ({ defaults, methodType, idToEdit }: IForm) => {
  const {
    setWordsList,
    setAddWord,
    editWordMode,
    setEditWordMode,
    setShowResults,
  } = useContext(MyGlobalContext);

  const { register, handleSubmit, reset, setFocus } = useForm<FormValues>({
    defaultValues: {
      word: defaults?.defaultWord,
      definition: defaults?.defaultDefinition,
      pronunciation: defaults?.defaultPronunciation,
      example: defaults?.defaultExample,
      mark: defaults?.defaultMark,
    },
  });
  // useState(() => {
  //   setFocus("word");
  // });
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const fetchWords = async () => {
      const wordsData = await fetch(
        `http://localhost:${SERVERPORT}/english-words`
      );

      return await wordsData.json();
    };

    const word = {
      id: uuidv4(),
      word: data.word,
      mark: data.mark,
      definition: data.definition,
      pronunciation: data.pronunciation,
      example: data.example,
    };

    if (methodType === "POST") {
      // Send data to the backend via POST to add a child resource
      try {
        await fetch(`http://localhost:${SERVERPORT}/english-words`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(word), // body data type must match "Content-Type" header
        });
        // Clear form inputs
        reset();

        const words = await fetchWords();
        setWordsList(words);

        setAddWord(false);
        // setShowResults(true);
      } catch (err) {
        console.log(err);
      }
    }

    if (methodType === "PUT") {
      // Send data to the backend via PUT to modify a resource
      try {
        const dataWithId = { id: idToEdit, ...data };
        await fetch(
          `http://localhost:${SERVERPORT}/english-words/${idToEdit}`,
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

        // Clear form inputs
        reset();

        // Get updated data

        const words = await fetchWords();

        setWordsList(words);
        // useEffect(() => {
        // }, [words]);

        if (editWordMode) setEditWordMode(!editWordMode);
        // setShowResults(true);
      } catch (err) {
        console.log(err);
      }
    }
    // Get updated words list from json server
    // const getWords = async () => {
    //   const data = await fetch(`http://localhost:${SERVERPORT}/english-words`);
    //   const words = await data.json();
    //   setWordsList(words);
    // };
    // getWords();
    // setShowResults(true);
  };

  const onCancel = () => {
    setAddWord(false);
    if (editWordMode) setEditWordMode(!editWordMode);
    // if (setSearchWord) setSearchWord("");
    // setShowResults(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      () => handleSubmit(onSubmit);
    }
    if (e.key === "Escape") {
      // if (inputRef.current?.value) inputRef.current.value = "";
      // setSearchWord("");
      setShowResults(false);
      setAddWord(false);
    }
  };

  return (
    <div onKeyUp={(e) => handleKeyUp(e)}>
      <form
        className="flex flex-col gap-2 mb-8 mx-auto text-slate-100 text-2xl py-4 px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center justify-end gap-4 text-md">
          <label>Word: </label>
          <textarea
            className="px-2 py-1 border border-white w-80 text-slate-700 h-12 bg-slate-200 rounded outline-none"
            {...register("word", {
              required: "Please enter a word.",
            })}
          />
        </div>

        <div className="flex items-center justify-end gap-4">
          <label>Definition:</label>
          <textarea
            {...register("definition", {
              // required: "Please enter a definition.",
            })}
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <label>Pronunciation:</label>
          <input
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
            {...register("pronunciation", {
              // required: "Please enter a pronunciation.",
            })}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <label>Example:</label>
          <textarea
            className="px-2 py-1 border border-white w-80 text-slate-700 h-32 scrollbar-hidden overflow-auto bg-slate-200 rounded outline-none"
            {...register("example", {
              // required: "Please ente r an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-end gap-4 mt-4">
          <label className="text-slate-200">Important:</label>
          <div className="w-80 py-1 text-center">
          <input
            type="checkbox"
            className="h-6 w-6 text-xl my-1 border border-white text-blue-700
            focus:ring-2 focus:ring-blue-500 rounded-sm focus:ring-offset-gray-700 text-center bg-slate-200 rounded outline-none"
            {...register("mark", {
              // required: "Mark important?",
            })}
          />
          </div>
        </div>
        <hr />
        <div className="flex gap-2 justify-between flex-end">
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

export default Form;
