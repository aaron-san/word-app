import { useContext, useRef, useEffect } from "react";
import { MyGlobalContext, SERVERPORT } from "../App";
import SearchInput from "../components/SearchInput";
import { IJWord } from "../types-japanese";
import AddButton from "../components/AddButton";

const JSearchBox = () => {
  useEffect(() => {
    const getJapaneseWords = async () => {
      const data = await fetch(`http://localhost:${SERVERPORT}/japanese-words`);
      const words = await data.json();
      setJWordsList(words);
    };
    getJapaneseWords();
  }, []);

  const {
    jWordsList,
    setJWordsList,
    addJWord,
    setAddJWord,
    searchJWord,
    setSearchJWord,
    setShowJResults,
    editJWordMode,
  } = useContext(MyGlobalContext);
  const inputJRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputJRef.current?.focus();
    if (inputJRef?.current) setSearchJWord(inputJRef.current.value);
  }, [addJWord]);

  // Add throttle (delay) to onChange handler
  // const [filteredWords, setFilteredWords] = useState<IWord[]>([]);

  // const doWordFilter = (e: string) => {
  //   if (!e) return setFilteredWords([]);

  //   setTimeout(() => {
  //     setFilteredWords(
  //       wordsList.filter((el) => el.word.toLowerCase().includes(searchWord))
  //     );
  //   }, 1);
  // };

  const addWordHandler = () => {
    // setFocus("word");
    setAddJWord(true);
    if (inputJRef?.current) setSearchJWord(inputJRef.current.value);
    setShowJResults(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchJWord(e.currentTarget.value);
      setShowJResults(true);
    }
    if (e.key === "Escape") {
      if (inputJRef.current?.value) inputJRef.current.value = "";
      setSearchJWord("");
      setShowJResults(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputJRef?.current) inputJRef.current.value = e.target.value;
  };

  return (
    <div className="flex gap-2 mx-auto rounded-md">
      {/* Search Bar */}

      <SearchInput
        wordsList={jWordsList as IJWord[]}
        inputRef={inputJRef}
        searchWord={searchJWord}
        handleKeyUp={handleKeyUp}
        handleChange={handleChange}
        addWord={addJWord}
        editWordMode={editJWordMode}
      />

      <AddButton
        addWordHandler={addWordHandler}
        disabled={addJWord || editJWordMode}
      />
    </div>
  );
};

export default JSearchBox;
