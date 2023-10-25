import React, {
  ChangeEvent,
  MouseEventHandler,
  useState,
  useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { SubmitHandler, useForm } from "react-hook-form";
import { IJWords, IAddJWord, IJDefaults } from "../types-japanese";
import JForm from "./JForm";

export type JFormValues = {
  word: string;
  english: string;
  japanese: string;
  example: string;
  present: string;
  teForm: string;
  negative: string;
  past: string;
  pastNegative: string;
  potential: string;
  imperative: string;
  volitional: string;
  group: string;
  desirative: string;
  conditional: string;
  passive: string;
  causative: string;
  causativePassive: string;
  honorific: string;
  humble: string;
  mark: boolean;
};
const AddWord = ({
  jWordsList,
  setJWordsList,
  addJWord,
  setAddJWord,
  showJResults,
  setShowJResults,
}: IAddJWord) => {
  // const { setFocus } = useForm<JFormValues>();

  // const onSubmit: SubmitHandler<FormValues> = (data) => {
  //   // console.log(data);

  //   const word = {
  //     id: uuidv4(),
  //     word: data.word,
  //     mark: data.mark,
  //     definition: data.definition,
  //     pronunciation: data.pronunciation,
  //     example: data.example,
  //   };

  //   // Get updated words list from json server
  //   const getWords = async () => {
  //     const data = await fetch("http://localhost:3000/words");
  //     const words = await data.json();
  //     setWordsList(words);
  //   };
  //   getWords();

  //   setAddWord(false);
  // };

  // useEffect(() => {
  //   setFocus("word");
  // }, []);

  return (
    <section>
      {addJWord && (
        <JForm
          setAddJWord={setAddJWord}
          setJWordsList={setJWordsList}
          jMethodType="POST"
          showJResults={showJResults}
          setShowJResults={setShowJResults}
        />
      )}
    </section>
  );
};

export default AddWord;
