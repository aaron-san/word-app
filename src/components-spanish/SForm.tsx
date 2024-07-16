import { useState, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { ISForm } from "../types-spanish";
import { MyGlobalContext, SERVERPORT } from "../App";

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

const SForm = ({ sDefaults, sMethodType }: ISForm) => {
  // console.log("SForm");
  const {
    setSWordsList,
    setAddSWord,
    editSWordMode,
    setEditSWordMode,
    setShowSResults,
    sIdToEdit,
  } = useContext(MyGlobalContext);

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
        await fetch(`http://localhost:${SERVERPORT}/spanish-words`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sWord), // body data type must match "Content-Type" header
        });
        // Clear form inputs
        reset();

        setAddSWord(false);
      } catch (err) {
        console.log(err);
      }
    }

    if (sMethodType === "PUT") {
      // Send data to the backend via POST
      try {
        // console.log(sIdToEdit);
        const dataWithId = { id: sIdToEdit, ...data };
        const res = await fetch(
          `http://localhost:${SERVERPORT}/spanish-words/${sIdToEdit}`,
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

        if (editSWordMode) setEditSWordMode(false);
      } catch (err) {
        console.log(err);
      }
    }
    // Get updated words list from json server
    const getWords = async () => {
      const data = await fetch(`http://localhost:${SERVERPORT}/spanish-words`);
      const words = await data.json();
      setSWordsList(words);
    };
    getWords();
    setShowSResults(true);
  };

  const onCancel = () => {
    setAddSWord(false);
    if (editSWordMode) setEditSWordMode(false);
    // if (setSearchSWord) setSearchSWord("");
    setShowSResults(true);
  };

  return (
    <div>
      <form
        className="flex flex-col max-w-[420px] gap-4 mb-4 mx-auto text-slate-100 text-2xl"
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
          <label>Example:</label>
          <textarea
            className="px-2 py-1 border border-white w-60 text-slate-700 h-[150px]"
            {...register("example", {
              // required: "Please enter an example.",
            })}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <label>Present:</label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("present", {
              // required: "Please enter a pronunciation.",
            })}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label>Past:</label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("past", {
              // required: "Please enter a pronunciation.",
            })}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label>Conditional:</label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("conditional", {
              // required: "Please enter a pronunciation.",
            })}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label>Subjunctive:</label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("subjunctive", {
              // required: "Please enter a pronunciation.",
            })}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label>Future:</label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("future", {
              // required: "Please enter a pronunciation.",
            })}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label>Imperfect:</label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("imperfect", {
              // required: "Please enter a pronunciation.",
            })}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label>Continuous Progressive:</label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("continuousProgressive", {
              // required: "Please enter a pronunciation.",
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
      <div className="max-w-[420px] mx-auto">
        <button
          className="w-full py-2 mx-auto text-2xl text-center bg-red-300 border rounded-md border-slate-100 text-slate-800"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SForm;
