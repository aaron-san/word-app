import { useEffect, useRef, useContext } from "react";
import { MyGlobalContext, SERVERPORT } from "../App";
import AddButton from "../components/AddButton";
import SearchInput from "../components/SearchInput";
import { IWord } from "../types-english";

const SearchBox = () => {
  useEffect(() => {
    const getEnglishWords = async () => {
      const data = await fetch(`http://localhost:${SERVERPORT}/english-words`);
      const words = await data.json();
      setWordsList(words);
    };
    getEnglishWords();
  }, []);

  const {
    wordsList,
    setWordsList,
    addWord,
    setAddWord,
    searchWord,
    setSearchWord,
    editWordMode,
    setShowResults,
  } = useContext(MyGlobalContext);
  // let searchWordRef = useRef<string>("");
  let inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    if (inputRef.current?.value) setSearchWord(inputRef.current?.value);
  }, [addWord]);

  const addWordHandler = () => {
    // setFocus("word");
    setAddWord(true);
    if (inputRef.current?.value) setSearchWord(inputRef.current.value);
    setShowResults(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchWord(e.currentTarget.value);
      setShowResults(true);
    }
    if (e.key === "Escape") {
      if (inputRef.current?.value) inputRef.current.value = "";
      setSearchWord("");
      setShowResults(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current) inputRef.current.value = e.target.value;
  };

  return (
    <div className="flex justify-start gap-2 mx-auto rounded">
      {/* Search Bar */}

      <SearchInput
        wordsList={wordsList as IWord[]}
        inputRef={inputRef}
        searchWord={searchWord}
        handleKeyUp={handleKeyUp}
        handleChange={handleChange}
        addWord={addWord}
        editWordMode={editWordMode}
      />

      <AddButton
        addWordHandler={addWordHandler}
        disabled={addWord || editWordMode}
      />
    </div>
  );
};

export default SearchBox;
