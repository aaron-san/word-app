import { useState, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { IJForm } from "../types-japanese";
import { MyGlobalContext, SERVERPORT } from "../App";

export type JFormValues = {
  word: string | null;
  english: string | null;
  japanese: string | null;
  example: string | null;
  present: string | null;
  teForm: string | null;
  negative: string | null;
  past: string | null;
  pastNegative: string | null;
  potential: string | null;
  imperative: string | null;
  volitional: string | null;
  group: string | null;
  desirative: string | null;
  conditional: string | null;
  passive: string | null;
  causative: string | null;
  causativePassive: string | null;
  honorific: string | null;
  humble: string | null;
  mark: boolean | null;
};

const JForm = ({ jDefaults, jMethodType, jIdToEdit }: IJForm) => {
  console.log("JForm");
  const {
    setJWordsList,
    editJWordMode,
    setEditJWordMode,
    setAddJWord,
    setShowJResults,
    searchJWord,
  } = useContext(MyGlobalContext);

  const { register, handleSubmit, reset, setFocus } = useForm<JFormValues>({
    defaultValues: {
      word: jDefaults?.defaultWord,
      english: jDefaults?.defaultEnglish,
      japanese: jDefaults?.defaultJapanese,
      example: jDefaults?.defaultExample,
      present: jDefaults?.defaultPresent,
      teForm: jDefaults?.defaultTeForm,
      negative: jDefaults?.defaultNegative,
      past: jDefaults?.defaultPast,
      pastNegative: jDefaults?.defaultPastNegative,
      potential: jDefaults?.defaultPotential,
      imperative: jDefaults?.defaultImperative,
      volitional: jDefaults?.defaultVolitional,
      group: jDefaults?.defaultGroup,
      desirative: jDefaults?.defaultDesirative,
      conditional: jDefaults?.defaultConditional,
      passive: jDefaults?.defaultPassive,
      causative: jDefaults?.defaultCausative,
      causativePassive: jDefaults?.defaultCausativePassive,
      honorific: jDefaults?.defaultHonorific,
      humble: jDefaults?.defaultHumble,
      mark: jDefaults?.defaultMark,
    },
  });
  useState(() => {
    setFocus("word");
  });
  const onSubmit: SubmitHandler<JFormValues> = async (data) => {
    // console.log(data);

    const jWord = {
      id: uuidv4(),
      word: data.word,
      english: data.english,
      japanese: data.japanese,
      example: data.example,
      present: data.present,
      teForm: data.teForm,
      negative: data.negative,
      past: data.past,
      pastNegative: data.pastNegative,
      potential: data.potential,
      imperative: data.imperative,
      volitional: data.volitional,
      group: data.group,
      desirative: data.desirative,
      conditional: data.conditional,
      passive: data.passive,
      causative: data.causative,
      causativePassive: data.causativePassive,
      honorific: data.honorific,
      humble: data.humble,
      mark: data.mark,
    };

    if (jMethodType === "POST") {
      // Send data to the backend via POST
      try {
        await fetch(`http://localhost:${SERVERPORT}/japanese-words`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jWord), // body data type must match "Content-Type" header
        });
        // Clear form inputs
        reset();

        setAddJWord(false);
      } catch (err) {
        console.log(err);
      }
    }

    if (jMethodType === "PUT") {
      // Send data to the backend via POST
      try {
        // console.log(jIdToEdit);
        const jDataWithId = { id: jIdToEdit, ...data };
        const res = await fetch(
          `http://localhost:${SERVERPORT}/japanese-words/${jIdToEdit}`,
          {
            method: "PUT",
            // mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            // body data type must match "Content-Type" header
            body: JSON.stringify(jDataWithId),
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

        if (editJWordMode) setEditJWordMode(false);
      } catch (err) {
        console.log(err);
      }
    }
    // Get updated words list from json server
    const getJWords = async () => {
      const data = await fetch(`http://localhost:${SERVERPORT}/japanese-words`);
      const words = await data.json();
      setJWordsList(words);
    };
    getJWords();
    setShowJResults(true);
  };

  const onCancel = () => {
    setAddJWord(false);
    if (editJWordMode) setEditJWordMode(false);
    // if (setSearchJWord) setSearchJWord("");
    setShowJResults(true);
  };

  const jKeys = [
    { label: "Word", key: "word" },

    { label: "English", key: "english" },

    { label: "Japanese", key: "japanese" },
    { label: "Example", key: "example" },
    { label: "Present", key: "present" },
    { label: "Te-Form", key: "teForm" },
    { label: "Negative", key: "negative" },
    { label: "Past", key: "past" },
    { label: "Past Negative", key: "pastNegative" },
    { label: "Imperative", key: "imperative" },
    { label: "Volitional", key: "volitional" },
    { label: "Group", key: "group" },
    { label: "Desirative", key: "desirative" },
    { label: "Conditional", key: "conditional" },
    { label: "Passive", key: "passive" },
    { label: "Causative", key: "causative" },
    { label: "Causative Passive", key: "causativePassive" },
    { label: "Honorific", key: "honorific" },
    { label: "Humble", key: "humble" },
  ];

  // const inputItems = jKeys.map((el) => {
  // // const {label, key} = el;
  //   return(
  //   <div className="flex items-center justify-between gap-4">
  //       <label>{el.label}:</label>
  //       <input
  //         className="px-2 py-1 border border-white w-60 text-slate-700"
  //         {...register(el.key, {
  //           required: "Please enter a word.",
  //         })}
  //       />
  //     </div>
  // )})

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
          <label>English:</label>
          <input
            {...register("english", {
              // required: "Please enter a definition.",
            })}
            className="px-2 py-1 border border-white w-60 text-slate-700"
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label>Japanese:</label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("japanese", {
              // required: "Please enter a pronunciation.",
            })}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label>Example:</label>
          <textarea
            // rows="3",
            // cols="4",

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
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label>Te-form:</label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("teForm", {
              // required: "Please enter an example.",
            })}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <label>Negative:</label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("negative", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label>Past:</label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("past", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label>Past Negative:</label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("pastNegative", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label>Imperative:</label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("imperative", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label>Volitional:</label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("volitional", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label>Group:</label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("group", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label>Desirative:</label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("desirative", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label>Conditional:</label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("conditional", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label>Passive:</label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("passive", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label>Causative:</label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("causative", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label>Causative Passive:</label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("causativePassive", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label>Honorific:</label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("honorific", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <label>Humble:</label>
          <input
            className="px-2 py-1 border border-white w-60 text-slate-700"
            {...register("humble", {
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

export default JForm;
