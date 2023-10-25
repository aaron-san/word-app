import React, {
  ChangeEvent,
  MouseEventHandler,
  useState,
  useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { SubmitHandler, useForm } from "react-hook-form";
import { IWords, IAddWord, IDefaults } from "../types-english";
import Form from "./Form";

export type FormValues = {
  word: string;
  mark: boolean;
  definition: string;
  pronunciation: string;
  example: string;
};
const AddWord = ({
  wordsList,
  setWordsList,
  addWord,
  setAddWord,
  showResults,
  setShowResults,
}: IAddWord) => {
  // const { setFocus } = useForm<FormValues>();

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
      {addWord && (
        <Form
          setAddWord={setAddWord}
          setWordsList={setWordsList}
          methodType="POST"
          showResults={showResults}
          setShowResults={setShowResults}
        />
      )}
    </section>
  );
};

export default AddWord;
