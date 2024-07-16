import { useContext, useRef, useEffect } from "react";
import { MyGlobalContext, SERVERPORT } from "../App";

const JSearchBox = () => {
  useEffect(() => {
    const getJapaneseWords = async () => {
      const data = await fetch(`http://localhost:${SERVERPORT}/japanese-words`);
      const words = await data.json();
      setJWordsList(words);
    };
    getJapaneseWords();
  }, []);

  // console.log("JSearchBox");
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
  //     console.log("====>", e);
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
    }
    if (e.key === "Escape") {
      if (inputJRef.current?.value) inputJRef.current.value = "";
      setSearchJWord("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputJRef?.current) inputJRef.current.value = e.target.value;
  };

  return (
    <div className="flex justify-start gap-2 mx-auto rounded-md w-[400px]">
      {/* Search Bar */}
      {!addJWord && !editJWordMode && (
        <input
          type="text"
          placeholder={`Search...       ${jWordsList.length} words`}
          defaultValue={searchJWord}
          ref={inputJRef}
          className="p-2 text-lg text-slate-600 border-2 border-slate-600 rounded-md"
          onKeyUp={(e) => handleKeyUp(e)}
          onChange={handleChange}
        />
      )}
      {!addJWord && !editJWordMode && (
        <div className="flex flex-col justify-center ">
          <button
            className="px-2 py-2 mr-2 border-2 border-white rounded-md active:scale-[98%] bg-cyan-100 text-slate-600 shadow-md text-lg"
            onClick={addWordHandler}
          >
            Add Word!
          </button>
          {/* <div className="mx-auto mt-1 text-sm text-slate-400">
            {`${jWordsList.length} words`}
          </div> */}
        </div>
      )}
    </div>
  );
};

export default JSearchBox;
