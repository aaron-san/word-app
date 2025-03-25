import { useEffect, useRef, useContext } from "react";
import { MyGlobalContext, SERVERPORT } from "../App";

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

  // const [showSearchBox, setShowSearchBox] = useState<boolean>(true)

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
    <div className="flex justify-start gap-2 mx-auto rounded-md">
      {/* Search Bar */}

      {!addWord && !editWordMode && (
        <>
      <input
        type="text"
        placeholder={`Search...       ${wordsList.length} words`}
        ref={inputRef}
        defaultValue={searchWord}
        className="p-2 text-lg border-2 rounded-md text-slate-600 border-slate-600"
        onKeyUp={(e) => handleKeyUp(e)}
        onChange={handleChange}
        autoFocus
      />

        <div className="flex flex-col justify-center ">
          <button
            className="px-2 py-2 mr-2 border-2 border-white rounded-md active:scale-[98%] bg-cyan-100 text-slate-600 shadow-md text-lg"
            onClick={addWordHandler}
          >
            Add
          </button>
        </div>
        </>
      )}
    </div>
  );
};

export default SearchBox;
