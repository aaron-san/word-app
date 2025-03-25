import { useContext } from "react";
import Form from "./Form";
import { MyGlobalContext, SERVERPORT } from "../App";

export type FormValues = {
  word: string;
  mark: boolean;
  definition: string;
  pronunciation: string;
  example: string;
};
const AddWord = () => {
  const { searchWord } = useContext(MyGlobalContext);

  const defaults = {
    defaultWord: searchWord,
  };

  //   // Get updated words list from json server
  //   const getWords = async () => {
  //     const data = await fetch(`http://localhost:${SERVERPORT}/words`);
  //     const words = await data.json();
  //     setWordsList(words);
  //   };
  //   getWords();

  //   setAddWord(false);
  // };

  return <Form methodType="POST" defaults={defaults} />;
};

export default AddWord;
