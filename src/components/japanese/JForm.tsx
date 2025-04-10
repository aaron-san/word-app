import { useState, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { IJDefaults, IJForm, IJWord } from "../../../types/types-japanese";
import { MyGlobalContext } from "../../App";

export type FormValues = {
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

const JForm = ({ word, methodType, idToEdit }: IJForm) => {
  const { languagesState, setLanguagesState } = useContext(MyGlobalContext);

  const language = "japanese";
  const wordsList = languagesState[language].wordsList;

  const defaults: IJDefaults = {
    defaultWord: word?.word || languagesState[language].searchWord || "",
    defaultEnglish: word?.english,
    defaultJapanese: word?.japanese || "",
    defaultExample: word?.example || "",
    defaultPresent: word?.present || "",
    defaultTeForm: word?.teForm || "",
    defaultNegative: word?.negative || "",
    defaultPast: word?.past || "",
    defaultPastNegative: word?.pastNegative || "",
    defaultPotential: word?.potential || "",
    defaultImperative: word?.imperative || "",
    defaultVolitional: word?.volitional || "",
    defaultGroup: word?.group || "",
    defaultDesirative: word?.desirative || "",
    defaultConditional: word?.conditional || "",
    defaultPassive: word?.passive || "",
    defaultCausative: word?.causative || "",
    defaultCausativePassive: word?.causativePassive || "",
    defaultHonorific: word?.honorific || "",
    defaultHumble: word?.humble || "",
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

  const addWord = (word: IJWord) => {
    setLanguagesState({
      ...languagesState,
      [language]: {
        ...languagesState[language],
        wordsList: [...wordsList, word] as IJWord[],
        addWord: false,
        showResults: false,
      },
    });
  };

  const updateWord = (word: IJWord) => {
    setLanguagesState({
      ...languagesState,
      [language]: {
        ...languagesState[language],
        wordsList: [
          ...(wordsList as IJWord[]).filter(
            (word: IJWord) => word.id !== idToEdit
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
      english: defaults?.defaultEnglish,
      japanese: defaults?.defaultJapanese,
      example: defaults?.defaultExample,
      present: defaults?.defaultPresent,
      teForm: defaults?.defaultTeForm,
      negative: defaults?.defaultNegative,
      past: defaults?.defaultPast,
      pastNegative: defaults?.defaultPastNegative,
      potential: defaults?.defaultPotential,
      imperative: defaults?.defaultImperative,
      volitional: defaults?.defaultVolitional,
      group: defaults?.defaultGroup,
      desirative: defaults?.defaultDesirative,
      conditional: defaults?.defaultConditional,
      passive: defaults?.defaultPassive,
      causative: defaults?.defaultCausative,
      causativePassive: defaults?.defaultCausativePassive,
      honorific: defaults?.defaultHonorific,
      humble: defaults?.defaultHumble,
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

    if (methodType === "POST") {
      reset();
      const wordsOnly = wordsList.map((word) => word.word);
      if (word.word && !wordsOnly.includes(word.word)) {
        addWord(word as IJWord);
      } else {
        console.log("Please provide a new word.");
      }
    }

    if (methodType === "PUT") {
      try {
        const dataWithId = { id: idToEdit, ...data };
        reset();
        updateWord(dataWithId as IJWord);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // if (methodType === "POST") {
  //   // Send data to the backend via POST
  //   try {
  //     // await fetch(`http://localhost:${SERVERPORT}/japanese-words`, {
  //     //   method: "POST",
  //     //   mode: "cors",
  //     //   headers: {
  //     //     "Content-Type": "application/json",
  //     //   },
  //     //   body: JSON.stringify(jWord), // body data type must match "Content-Type" header
  //     // });
  //     // Clear form inputs
  //     reset();

  //     addWord("japanese", word as IJWord);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // if (methodType === "PUT") {
  //   // Send data to the backend via POST
  //   try {
  //     // console.log(jIdToEdit);
  //     const jDataWithId = { id: idToEdit, ...data };
  //     // const res = await fetch(
  //     //   `http://localhost:${SERVERPORT}/japanese-words/${jIdToEdit}`,
  //     //   {
  //     //     method: "PUT",
  //     //     // mode: "cors",
  //     //     headers: {
  //     //       "Content-Type": "application/json",
  //     //     },
  //     //     // body data type must match "Content-Type" header
  //     //     body: JSON.stringify(jDataWithId),
  //     //   }
  //     // );
  //     // const res_data = await res.json();
  //     // const result = {
  //     //   status: res.status + "-" + res.statusText,
  //     //   headers: { "Content-Type": res.headers.get("Content-Type") },
  //     //   data: res_data,
  //     // };
  //     // Clear form inputs
  //     reset();
  //     const words = languagesState[language].wordsList.map(
  //       (word) => word.word
  //     );

  //     if (jDataWithId.word && !words.includes(jDataWithId.word)) {
  //       updateWord("japanese", dataWithId as IJWord);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // Get updated words list from json server
  // const getJWords = async () => {
  //   const data = await fetch(`http://localhost:${SERVERPORT}/japanese-words`);
  //   const words = await data.json();
  //   setJWordsList(words);
  // };
  // getJWords();
  // };

  // const jKeys = [
  //   { label: "Word", key: "word" },

  //   { label: "English", key: "english" },

  //   { label: "Japanese", key: "japanese" },
  //   { label: "Example", key: "example" },
  //   { label: "Present", key: "present" },
  //   { label: "Te-Form", key: "teForm" },
  //   { label: "Negative", key: "negative" },
  //   { label: "Past", key: "past" },
  //   { label: "Past Negative", key: "pastNegative" },
  //   { label: "Imperative", key: "imperative" },
  //   { label: "Volitional", key: "volitional" },
  //   { label: "Group", key: "group" },
  //   { label: "Desirative", key: "desirative" },
  //   { label: "Conditional", key: "conditional" },
  //   { label: "Passive", key: "passive" },
  //   { label: "Causative", key: "causative" },
  //   { label: "Causative Passive", key: "causativePassive" },
  //   { label: "Honorific", key: "honorific" },
  //   { label: "Humble", key: "humble" },
  // ];

  // const inputItems = jKeys.map((el) => {
  // // const {label, key} = el;
  //   return(
  //   <div className="flex items-center justify-between gap-4">
  //       <label>{el.label}:</label>
  //       <input
  //         className="px-2 py-1 border border-white w-80 text-slate-700"
  //         {...register(el.key, {
  //           required: "Please enter a word.",
  //         })}
  //       />
  //     </div>
  // )})

  return (
    <form
      className="flex flex-col gap-2 mb-8 mx-auto text-slate-100 text-xl py-4 px-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col justify-end gap-4 text-md">
        <label>Word: </label>
        <textarea
          className="px-2 py-1 border border-white w-80 text-slate-700 h-12 bg-slate-200 rounded outline-none"
          {...register("word", {
            required: "Please enter a word.",
          })}
        />
      </div>

      <div className="flex flex-col justify-end gap-4">
        <label>English:</label>
        <textarea
          {...register("english", {
            // required: "Please enter a definition.",
          })}
          className="px-2 py-1 border border-white w-80 text-slate-700 hide-scrollbar overflow-auto bg-slate-200 rounded outline-none"
        />
      </div>
      <div className="flex flex-col justify-end gap-4">
        <label>Japanese:</label>
        <textarea
          className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
          {...register("japanese", {
            // required: "Please enter a pronunciation.",
          })}
        />
      </div>
      <div className="flex flex-col justify-end gap-4">
        <label>Example:</label>
        <textarea
          className="px-2 py-1 border border-white w-80 text-slate-700 h-32 bg-slate-200 rounded outline-none"
          {...register("example", {
            // required: "Please enter an example.",
          })}
        />
      </div>
      <div className="flex flex-col justify-end gap-4">
        <label>Present:</label>
        <input
          className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
          {...register("present", {
            // required: "Please enter an example.",
          })}
        />
      </div>
      <div className="flex flex-col justify-end gap-4">
        <label>Te-form:</label>
        <input
          className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
          {...register("teForm", {
            // required: "Please enter an example.",
          })}
        />
      </div>

      <div className="flex flex-col justify-end gap-4">
        <label>Negative:</label>
        <input
          className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
          {...register("negative", {
            // required: "Please enter an example.",
          })}
        />
      </div>
      <div className="flex flex-col justify-end gap-4">
        <label>Past:</label>
        <input
          className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
          {...register("past", {
            // required: "Please enter an example.",
          })}
        />
      </div>
      <div className="flex flex-col justify-end gap-4">
        <label>Past Negative:</label>
        <input
          className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
          {...register("pastNegative", {
            // required: "Please enter an example.",
          })}
        />
      </div>
      <div className="flex flex-col justify-end gap-4">
        <label>Imperative:</label>
        <input
          className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
          {...register("imperative", {
            // required: "Please enter an example.",
          })}
        />
      </div>
      <div className="flex flex-col justify-end gap-4">
        <label>Volitional:</label>
        <input
          className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
          {...register("volitional", {
            // required: "Please enter an example.",
          })}
        />
      </div>
      <div className="flex flex-col justify-end gap-4">
        <label>Group:</label>
        <input
          className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
          {...register("group", {
            // required: "Please enter an example.",
          })}
        />
      </div>
      <div className="flex flex-col justify-end gap-4">
        <label>Desirative:</label>
        <input
          className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
          {...register("desirative", {
            // required: "Please enter an example.",
          })}
        />
      </div>
      <div className="flex flex-col justify-end gap-4">
        <label>Conditional:</label>
        <input
          className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
          {...register("conditional", {
            // required: "Please enter an example.",
          })}
        />
      </div>
      <div className="flex flex-col justify-end gap-4">
        <label>Passive:</label>
        <input
          className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
          {...register("passive", {
            // required: "Please enter an example.",
          })}
        />
      </div>
      <div className="flex flex-col justify-end gap-4">
        <label>Causative:</label>
        <input
          className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
          {...register("causative", {
            // required: "Please enter an example.",
          })}
        />
      </div>
      <div className="flex flex-col justify-end gap-4">
        <label>Caus. Passive:</label>
        <input
          className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
          {...register("causativePassive", {
            // required: "Please enter an example.",
          })}
        />
      </div>
      <div className="flex flex-col justify-end gap-4">
        <label>Honorific:</label>
        <input
          className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
          {...register("honorific", {
            // required: "Please enter an example.",
          })}
        />
      </div>
      <div className="flex flex-col justify-end gap-4">
        <label>Humble:</label>
        <input
          className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
          {...register("humble", {
            // required: "Please enter an example.",
          })}
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

export default JForm;
