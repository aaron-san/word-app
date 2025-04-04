import { useState, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { IJForm, IJWord } from "../../../types/types-japanese";
import { MyGlobalContext } from "../../App";
import { IWord } from "../../../types/types-english";
import { ISWord } from "../../../types/types-spanish";


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
  // console.log("JForm");
  const { languagesState, setLanguagesState } = useContext(MyGlobalContext);

  const japaneseWords = languagesState.japanese.wordsList;

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

const addWord = (
  language: "english" | "japanese" | "spanish",
  word: IWord | IJWord | ISWord
) => {
  const { languagesState, setLanguagesState } = useContext(MyGlobalContext);

  switch (language) {
    case "english":
      setLanguagesState({
        ...languagesState,
        [language]: {
          ...languagesState[language],
          wordsList: [
            ...(languagesState[language].wordsList as IWord[]),
            word as IWord,
          ],
          addWord: false,
        },
      });

      break;
    case "japanese":
      setLanguagesState({
        ...languagesState,
        [language]: {
          ...languagesState[language],
          wordsList: [
            ...(languagesState[language].wordsList as IJWord[]),
            word as IJWord,
          ],
          addWord: false,
        },
      });

      break;
    case "spanish":
      setLanguagesState({
        ...languagesState,
        [language]: {
          ...languagesState[language],
          wordsList: [
            ...(languagesState[language].wordsList as ISWord[]),
            word as ISWord,
          ],
          addWord: false,
        },
      });

      break;
    default:
      return;
  }
};

const updateWord = (
  language: "english" | "japanese" | "spanish",
  word: IWord | IJWord | ISWord
) => {
  const { languagesState, setLanguagesState } = useContext(MyGlobalContext);

  switch (language) {
    case "english":
      setLanguagesState({
        ...languagesState,
        [language]: {
          ...languagesState[language],
          wordsList: [
            ...(languagesState[language].wordsList as IWord[]),
            word as IWord,
          ],
          // addWord: false,
          editWordMode: false,
          // showResults: false
        },
      });

      break;
    case "japanese":
      setLanguagesState({
        ...languagesState,
        [language]: {
          ...languagesState[language],
          wordsList: [
            ...(languagesState[language].wordsList as IJWord[]),
            word as IJWord,
          ],
          // addWord: false,
          editWordMode: false,
        },
      });

      break;
    case "spanish":
      setLanguagesState({
        ...languagesState,
        [language]: {
          ...languagesState[language],
          wordsList: [
            ...(languagesState[language].wordsList as ISWord[]),
            word as ISWord,
          ],
          // addWord: false,
          editWordMode: false,
        },
      });

      break;
    default:
      return;
  }
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
        // await fetch(`http://localhost:${SERVERPORT}/japanese-words`, {
        //   method: "POST",
        //   mode: "cors",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(jWord), // body data type must match "Content-Type" header
        // });
        // Clear form inputs
        reset();

        addWord("japanese", jWord as IJWord);
      } catch (err) {
        console.log(err);
      }
    }

    if (jMethodType === "PUT") {
      // Send data to the backend via POST
      try {
        // console.log(jIdToEdit);
        const jDataWithId = { id: jIdToEdit, ...data };
        // const res = await fetch(
        //   `http://localhost:${SERVERPORT}/japanese-words/${jIdToEdit}`,
        //   {
        //     method: "PUT",
        //     // mode: "cors",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     // body data type must match "Content-Type" header
        //     body: JSON.stringify(jDataWithId),
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
        const jWords = languagesState.japanese.wordsList.map(
          (word) => word.word
        );

        if (jDataWithId.word && !jWords.includes(jDataWithId.word)) {
          updateWord("japanese", jDataWithId as IJWord);
        }
      } catch (err) {
        console.log(err);
      }
    }
    // Get updated words list from json server
    // const getJWords = async () => {
    //   const data = await fetch(`http://localhost:${SERVERPORT}/japanese-words`);
    //   const words = await data.json();
    //   setJWordsList(words);
    // };
    // getJWords();
  };

  const onCancel = () => {
    cancel("japanese");
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
          <label>English:</label>
          <textarea
            {...register("english", {
              // required: "Please enter a definition.",
            })}
            className="px-2 py-1 border border-white w-80 text-slate-700 hide-scrollbar overflow-auto bg-slate-200 rounded outline-none"
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <label>Japanese:</label>
          <textarea
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
            {...register("japanese", {
              // required: "Please enter a pronunciation.",
            })}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <label>Example:</label>
          <textarea
            className="px-2 py-1 border border-white w-80 text-slate-700 h-32 bg-slate-200 rounded outline-none"
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
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <label>Te-form:</label>
          <input
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
            {...register("teForm", {
              // required: "Please enter an example.",
            })}
          />
        </div>

        <div className="flex items-center justify-end gap-4">
          <label>Negative:</label>
          <input
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
            {...register("negative", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <label>Past:</label>
          <input
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
            {...register("past", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <label>Past Negative:</label>
          <input
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
            {...register("pastNegative", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <label>Imperative:</label>
          <input
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
            {...register("imperative", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <label>Volitional:</label>
          <input
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
            {...register("volitional", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <label>Group:</label>
          <input
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
            {...register("group", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <label>Desirative:</label>
          <input
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
            {...register("desirative", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <label>Conditional:</label>
          <input
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
            {...register("conditional", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <label>Passive:</label>
          <input
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
            {...register("passive", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <label>Causative:</label>
          <input
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
            {...register("causative", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <label>Caus. Passive:</label>
          <input
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
            {...register("causativePassive", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <label>Honorific:</label>
          <input
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
            {...register("honorific", {
              // required: "Please enter an example.",
            })}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <label>Humble:</label>
          <input
            className="px-2 py-1 border border-white w-80 text-slate-700 bg-slate-200 rounded outline-none"
            {...register("humble", {
              // required: "Please enter an example.",
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
    
  );
};

export default JForm;
