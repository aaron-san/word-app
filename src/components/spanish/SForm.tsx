import { useContext, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { ISForm, ISWord } from "../../../types/types-spanish";
import { MyGlobalContext } from "../../App";
import { sendPostRequest, sendPutRequest } from "../../utils/functions";

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

const SForm = ({ word, methodType, idToEdit }: ISForm) => {
  const { languagesState, setLanguagesState } = useContext(MyGlobalContext);

  const language = "spanish";
  const wordsList = languagesState[language].wordsList;

  const defaults: FormValues = {
    word: word?.word || languagesState[language].searchWord || "",
    definition: word?.definition || "",
    example: word?.example || "",
    present: word?.present || "",
    past: word?.past || "",
    conditional: word?.conditional || "",
    subjunctive: word?.subjunctive || "",
    future: word?.future || "",
    imperfect: word?.imperfect || "",
    continuousProgressive: word?.continuousProgressive || "",
    mark: word?.mark || false,
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
  } = useForm<FormValues>({
    defaultValues: defaults
  });

  // --- track last active field + cursor ---
  const lastActiveRef = useRef<{
    element: HTMLInputElement | HTMLTextAreaElement | null;
    start: number;
    end: number;
  }>({ element: null, start: 0, end: 0 });

  const rememberCursor = (
    e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const el = e.currentTarget;
    lastActiveRef.current = {
      element: el,
      start: el.selectionStart ?? el.value.length,
      end: el.selectionEnd ?? el.value.length,
    };
  };

  const selectChar = (char: string) => {
    const { element, start, end } = lastActiveRef.current;
    if (element && element.name) {
      const fieldName = element.name as keyof FormValues;
      const currentValue = String(getValues(fieldName) || "");

      const newValue =
        currentValue.slice(0, start) + char + currentValue.slice(end);

      setValue(fieldName, newValue, {
        shouldDirty: true,
        shouldValidate: true,
      });

      // restore cursor & ref
      requestAnimationFrame(() => {
        if (element) {
          element.focus();
          const cursor = start + char.length;
          element.setSelectionRange(cursor, cursor);
          lastActiveRef.current = { element, start: cursor, end: cursor };
        }
      });
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const newWord: ISWord = {
      id: uuidv4(),
      word: data.word as string,
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

    if (methodType === "POST") {
      reset();
      const wordsOnly = wordsList.map((w) => w.word);
      if (newWord.word && !wordsOnly.includes(newWord.word)) {
        setLanguagesState({
          ...languagesState,
          [language]: {
            ...languagesState[language],
            wordsList: [...wordsList, newWord] as ISWord[],
            addWord: false,
            showResults: false,
          },
        });
        sendPostRequest({ language: "spanish", word: newWord });
      }
    }

    if (methodType === "PUT") {
      try {
        const dataWithId = { id: idToEdit, ...data };
        reset();
        setLanguagesState({
          ...languagesState,
          [language]: {
            ...languagesState[language],
            wordsList: [
              ...wordsList.filter((w) => w.id !== idToEdit),
              dataWithId as ISWord,
            ] as ISWord[],
            editWordMode: false,
            showResults: false,
          },
        });
        sendPutRequest({ language: "spanish", word: dataWithId as ISWord });
      } catch (err) {
        console.log(err);
      }
    }
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

  const values = watch();

  return (
    <form
      className="flex flex-col gap-2 mx-auto mb-8 px-4 py-4 w-fit text-slate-100 text-2xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* special characters */}
      <div className="flex flex-wrap gap-2">
        {"áéíóúñü¿".split("").map((char) => (
          <button
            type="button"
            onClick={() => selectChar(char)}
            key={char}
            className="bg-gradient-to-b from-gray-400 to-gray-500 py-1 border-gray-100 rounded-lg w-8 font-bold text-gray-50 text-lg active:scale-[0.98]"
          >
            {char}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {"ÁÉÍÓÚÑÜ¡".split("").map((char) => (
          <button
            type="button"
            onClick={() => selectChar(char)}
            key={char}
            className="bg-gradient-to-b from-gray-400 to-gray-500 py-1 border-gray-100 rounded-lg w-8 font-bold text-gray-50 text-lg active:scale-[0.98]"
          >
            {char}
          </button>
        ))}
      </div>

      {/* Example input */}
      <div className="flex flex-col gap-4">
        <label>Word:</label>
        <input
          {...register("word", { required: "Please enter a word." })}
          value={values.word ?? ""}
          onClick={rememberCursor}
          onKeyUp={rememberCursor}
          onSelect={rememberCursor}
          className="bg-slate-200 px-2 py-1 border border-white rounded outline-none w-80 text-slate-700"
        />
      </div>

      <div className="flex flex-col gap-4">
        <label>Definition:</label>
        <input
          {...register("definition")}
          value={values.definition ?? ""}
          onClick={rememberCursor}
          onKeyUp={rememberCursor}
          onSelect={rememberCursor}
          className="bg-slate-200 px-2 py-1 border border-white rounded outline-none w-80 text-slate-700"
        />
      </div>

      <div className="flex flex-col gap-4">
        <label>Example:</label>
        <textarea
          {...register("example")}
          value={values.example ?? ""}
          onClick={rememberCursor}
          onKeyUp={rememberCursor}
          onSelect={rememberCursor}
          className="bg-slate-200 px-2 py-1 border border-white rounded outline-none w-80 h-[150px] text-slate-700"
        />
      </div>

      {/* ...repeat for present, past, conditional, etc. adding rememberCursor hooks ... */}

      <hr />
      <div className="flex gap-2 text-xl">
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

export default SForm;
