import { ISWords, IAddSWord, ISDefaults } from "../types-spanish";
import SForm from "./SForm";

export type FormValues = {
  word: string;
  definition: string;
  example: string;
  present: string;
  past: string;
  conditional: string;
  subjunctive: string;
  future: string;
  imperfect: string;
  continuousProgressive: string;
  mark: boolean;
};
const AddSWord = ({
  sWordsList,
  setSWordsList,
  addSWord,
  setAddSWord,
  showSResults,
  setShowSResults,
}: IAddSWord) => {
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
      {addSWord && (
        <SForm
          setAddSWord={setAddSWord}
          setSWordsList={setSWordsList}
          sMethodType="POST"
          showSResults={showSResults}
          setShowSResults={setShowSResults}
        />
      )}
    </section>
  );
};

export default AddSWord;
