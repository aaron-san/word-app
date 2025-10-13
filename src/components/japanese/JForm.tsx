import React, { useState, useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { IJDefaults, IJForm, IJWord } from "../../../types/types-japanese";
import { MyGlobalContext } from "../../App";
import {
  sendPostRequest,
  sendPutRequest,
  autoResize,
} from "../../utils/functions";

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
  const [showExtraFields, setShowExtraFields] = useState(false);

  const language = "japanese";
  const wordsList = languagesState[language].wordsList;

  const jDefaults: IJDefaults = {
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

  useEffect(() => {
    const textareas =
      document.querySelectorAll<HTMLTextAreaElement>("textarea");
    textareas.forEach((el) => {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + 4 + "px";
    });
  }, []);

  const updateState = (updates: { [key: string]: string | boolean }) => {
    setLanguagesState({
      ...languagesState,
      [language]: {
        ...languagesState[language],
        ...updates,
      },
    });
  };

  const addWord = async (word: IJWord) => {
    setLanguagesState({
      ...languagesState,
      [language]: {
        ...languagesState[language],
        wordsList: [...wordsList, word] as IJWord[],
        addWord: false,
        showResults: false,
      },
    });
    sendPostRequest({ word: word, language: "japanese" });
  };

  const updateWord = async (word: IJWord) => {
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

    sendPutRequest({ language: "japanese", word });
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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // console.log("Submitted!");
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
      const wordsOnly = wordsList.map((word) => word.word);
      const japaneseOnly = (wordsList as IJWord[]).map((word) => word.japanese);
      if (!word.word) {
        console.log("Please provide a new word.");
      }
      if (
        word.word &&
        wordsOnly.includes(word.word) &&
        word.japanese &&
        japaneseOnly.includes(word.japanese)
      ) {
        console.log("Word already exists!");
        return;
      }

      addWord(word as IJWord);
      reset();
    }

    if (methodType === "PUT") {
      try {
        const dataWithId = { id: idToEdit, ...data };
        updateWord(dataWithId as IJWord);
        reset();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const Label = (label: string) => {
    return <label className="mt-2 text-sm">{label}</label>;
  };

  type ExtraFieldKey =
    | "group"
    | "teForm"
    | "negative"
    | "past"
    | "pastNegative"
    | "imperative"
    | "volitional"
    | "desirative"
    | "conditional"
    | "passive"
    | "causative"
    | "causativePassive"
    | "honorific"
    | "humble";

  type ExtraFields = {
    name: ExtraFieldKey;
    label: string;
  };

  const extraFields: ExtraFields[] = [
    { name: "group", label: "Group" },
    { name: "teForm", label: "Te-form" },
    { name: "negative", label: "Negative" },
    { name: "past", label: "Past" },
    { name: "pastNegative", label: "Past Negative" },
    { name: "imperative", label: "Imperative" },
    { name: "volitional", label: "Volitional" },
    { name: "desirative", label: "Desirative" },
    { name: "conditional", label: "Conditional" },
    { name: "passive", label: "Passive" },
    { name: "causative", label: "Causative" },
    { name: "causativePassive", label: "Caus. Passive" },
    { name: "honorific", label: "Honorific" },
    { name: "humble", label: "Humble" },
  ];

  return (
    <form
      className="flex flex-col gap-2 mx-auto mb-8 px-4 py-4 text-slate-100 text-xl"
      onSubmit={handleSubmit(onSubmit)}
      onClick={(e) => e.stopPropagation()} // stop bubbling inside form
    >
      <div className="flex flex-col justify-end gap-2 text-md">
        <div className="flex justify-between">
          <label className="py-2 text-sm">Word: </label>
          <div className="flex flex-end justify-end gap-2 text-xl">
            <input
              type="submit"
              value="Save"
              className="bg-blue-300 hover:opacity-95 my-1 px-4 py-1 border border-slate-100 rounded-full w-[80px] text-slate-800 text-sm text-center cursor-pointer"
            />
            <input
              type="button"
              className="bg-red-300 hover:opacity-95 my-1 px-4 py-1 border border-slate-100 rounded-full w-[80px] text-slate-800 text-sm text-center cursor-pointer"
              value="Cancel"
              onClick={(e) => {
                e.stopPropagation(); // keep safe
                onCancel();
              }}
            />
          </div>
        </div>
        <textarea
          className="bg-slate-200 px-2 py-1 border border-white rounded outline-none w-80 text-slate-700"
          {...register("word", {
            required: "Please enter a word.",
          })}
        />
      </div>

      <div className="flex flex-col justify-end gap-2">
        {Label("English:")}
        <textarea
          {...register("english", {
            // required: "Please enter a definition.",
          })}
          className="bg-slate-200 px-2 py-1 border border-white rounded outline-none w-80 text-slate-700 resize-none"
          onInput={autoResize}
          rows={2} // starts with 2 lines
        />
      </div>
      <div className="flex flex-col justify-end gap-2">
        {Label("Japanese:")}
        <textarea
          className="bg-slate-200 px-2 py-1 border border-white rounded outline-none w-80 font-notojp text-slate-700 text-4xl field-sizing-content"
          {...register("japanese", {
            // required: "Please enter a pronunciation.",
          })}
          onInput={autoResize}
        />
      </div>
      <div className="flex flex-col justify-end gap-2">
        {Label("Example:")}
        <textarea
          className="bg-slate-200 px-2 py-1 border border-white rounded outline-none w-80 text-slate-700"
          {...register("example", {
            // required: "Please enter an example.",
          })}
          onInput={autoResize}
        />
      </div>
      <div className="flex justify-between py-2">
        <div className="flex justify-end gap-2 align-middle">
          <label className="py-2 text-slate-200 text-sm">Important:</label>
          <div className="py-1 w-10 text-center">
            <input
              type="checkbox"
              className="my-1 border border-white rounded-full outline-none focus:ring-2 w-6 h-6 accent-teal-300 cursor-pointer"
              {...register("mark")}
            />
          </div>
        </div>
        <button
          className="hover:opacity-98 ml-auto py-1 w-fit text-sm"
          type="button" // prevents accidental form submit; In HTML, a <button> inside a <form> defaults to type="submit" if you don’t explicitly set its type.
          onClick={(e) => {
            e.stopPropagation(); // prevent closing the form
            setShowExtraFields((prev) => !prev);
          }}
        >
          {showExtraFields ? "Less ▲" : "More ▼"}
        </button>
      </div>
      {showExtraFields && (
        <div className="flex flex-col justify-end gap-2">
          {extraFields.map((field: ExtraFields) => {
            return (
              <div className="flex flex-col justify-end gap-2" key={field.name}>
                {Label(field.label + ":")}
                <input
                  className="bg-slate-200 px-2 py-1 border border-white rounded outline-none w-80 text-slate-700"
                  {...register(field.name, {
                    // required: "Please enter an example.",
                  })}
                />
              </div>
            );
          })}
        </div>
      )}
      {/* <div className="flex flex-col justify-end gap-1 text-md">
        
      </div> */}
      <hr />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-300 hover:opacity-95 my-1 px-4 py-1 border border-slate-100 rounded-full w-1/2 text-slate-800 text-sm text-center cursor-pointer"
        >
          Save
        </button>

        <button
          type="button"
          className="bg-red-300 hover:opacity-95 my-1 px-4 py-1 border border-slate-100 rounded-full w-1/2 text-slate-800 text-sm text-center cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onCancel();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default JForm;
