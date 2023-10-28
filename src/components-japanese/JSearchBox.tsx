import { useContext } from "react";
import { MyGlobalContext } from "../App";

const JSearchBox = () => {
  const {
    jWordsList,
    addJWord,
    setAddJWord,
    searchJWord,
    setSearchJWord,
    setShowJResults,
    editJWordMode,
  } = useContext(MyGlobalContext);
  // const searchJRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   searchJRef.current?.focus();
  // }, []);

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
    setAddJWord(true);
    setShowJResults(false);
  };

  const onAddSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchJWord(e.target.value);
  };

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>
    // ie: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setSearchJWord(e.currentTarget.value);
    }
  };

  return (
    <div className="flex justify-start gap-2 mx-auto rounded-md w-fit bg-slate-800/70">
      {/* Search Bar */}
      {!addJWord && !editJWordMode && (
        <input
          type="text"
          placeholder="Search..."
          defaultValue={searchJWord}
          // ref={searchRef}
          className="p-2 m-2 text-lg text-white bg-transparent border-2 rounded-md"
          // onChange={onAddSearchWord}
          onKeyUp={(e) => handleKeyUp(e)}
        />
      )}
      {!addJWord && !editJWordMode && (
        <div className="flex flex-col justify-center ">
          <button
            className="px-2 py-2 mt-2 mr-2 border border-white rounded-md active:scale-95 bg-slate-100 text-slate-700"
            onClick={addWordHandler}
          >
            Add Word!
          </button>
          <div className="mx-auto mt-1 text-sm text-slate-400">
            {`${jWordsList.length} words`}
          </div>
        </div>
      )}
    </div>
  );
};

export default JSearchBox;
