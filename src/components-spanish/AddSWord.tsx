import SForm from "./SForm";
import { useContext } from "react";
import { MyGlobalContext } from "../App";

const AddSWord = () => {
  // console.log("AddSWord");
  const { addSWord, searchSWord } = useContext(MyGlobalContext);

  const sDefaults = {
    defaultWord: searchSWord,
  };
  // const { setFocus } = useForm<FormValues>();

  // useEffect(() => {
  //   setFocus("word");
  // }, []);

  return (
    <section>
      {addSWord && <SForm sMethodType="POST" sDefaults={sDefaults} />}
    </section>
  );
};

export default AddSWord;
