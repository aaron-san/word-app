import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { IWords, IAddWord, IDefaults } from "../types-english";
import Form from "./Form";
import { MyGlobalContext } from "../App";

export type FormValues = {
  word: string;
  mark: boolean;
  definition: string;
  pronunciation: string;
  example: string;
};
const AddWord = () => {
  const { addWord, searchWord } = useContext(MyGlobalContext);

  const defaults = {
    defaultWord: searchWord,
  };

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
      {addWord && <Form methodType="POST" defaults={defaults} />}
    </section>
  );
};

export default AddWord;
