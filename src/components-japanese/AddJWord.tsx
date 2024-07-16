import { useContext } from "react";
import JForm from "./JForm";
import { MyGlobalContext } from "../App";

const AddJWord = () => {
  console.log("AddJWord");
  const { addJWord, searchJWord } = useContext(MyGlobalContext);
  const jDefaults = {
    defaultWord: searchJWord,
  };

  return (
    <section>
      {addJWord && <JForm jMethodType="POST" jDefaults={jDefaults} />}
    </section>
  );
};

export default AddJWord;
