import { useEffect, useRef, useContext } from "react";
import { MyGlobalContext } from "../App";

const SearchBox = () => {
  const {
    wordsList,
    addWord,
    setAddWord,
    searchWord,
    setSearchWord,
    editWordMode,
    setShowResults,
  } = useContext(MyGlobalContext);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  // const [showSearchBox, setShowSearchBox] = useState<boolean>(true)

  // Add throttle (delay) to onChange handler
  // const [filteredWords, setFilteredWords] = useState<IWord[]>([]);

  // const doWordFilter = (e: string) => {
  //   if (!e) return setFilteredWords([]);

  //   setTimeout(() => {
  //     console.log("====>", e);
  //     setFilteredWords(
  //       wordsList.filter((el) => el.word.toLowerCase().includes(searchWord))
  //     );
  //   }, 1);
  // };

  const addWordHandler = () => {
    // setFocus("word");
    setAddWord(true);
    setShowResults(false);
  };

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>
    // ie: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setSearchWord(e.currentTarget.value);
    }
  };

  return (
    <div className="flex justify-start gap-2 mx-auto rounded-md w-fit bg-slate-800/70">
      {/* Search Bar */}
      {!addWord && !editWordMode && (
        <input
          type="text"
          placeholder="Search..."
          // ref={searchRef}
          defaultValue={searchWord}
          className="p-2 m-2 text-lg text-white bg-transparent border-2 rounded-md"
          onKeyUp={(e) => handleKeyUp(e)}
        />
      )}
      {!addWord && !editWordMode && (
        <div className="flex flex-col justify-center ">
          <button
            className="px-2 py-2 mt-2 mr-2 border border-white rounded-md active:scale-95 bg-slate-100 text-slate-700"
            onClick={addWordHandler}
          >
            Add Word!
          </button>
          <div className="mx-auto mt-1 text-sm text-slate-400">
            {`${wordsList.length} words`}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
