import React, { useState, createContext, useEffect, useContext } from "react";
import "./App.css";
// import { Link } from "react-router-dom";
import WordsList from "./components/WordsList";
import SearchBox from "./components/SearchBox";
import SearchResults from "./components/SearchResults";
import { IWord } from "./types";
// import Form from "./components/Form";

// export const myContext = createContext<unknown>(null);

function App() {
  // const value = useContext(myContext);
  // function handleSubmit(formData: FormData) {
  //   console.log(formData);
  // }

  const [wordsList, setWordsList] = useState<IWord[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");

  useEffect(() => {
    const getWords = async () => {
      const data = await fetch("http://localhost:3000/words");
      const words = await data.json();
      setWordsList(words);
    };
    getWords();
  }, []);

  const [addWord, setAddWord] = useState<boolean>(false);

  return (
    <main className="min-w-screen min-h-screen pt-4 mx-auto bg-slate-700 bg-[url('./images/bg2.jpg')]  bg-no-repeat bg-cover">
      {/* <Form onSubmit={handleSubmit} /> */}
      <div className="bg-slate-200/80 w-fit mx-auto rounded-lg px-4 my-6 py-4">
        <div className="">
          <a
            className="text-[3rem] text-slate-600 font-['Bitter'] font-bold"
            href="/"
          >
            English Words
          </a>
          <div className="w-[200px] h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent mx-auto"></div>
        </div>
        <SearchBox
          wordsList={wordsList}
          setWordsList={setWordsList}
          addWord={addWord}
          setAddWord={setAddWord}
          searchWord={searchWord}
          setSearchWord={setSearchWord}
        />
      </div>
      <SearchResults
        wordsList={wordsList}
        setWordsList={setWordsList}
        addWord={addWord}
        setAddWord={setAddWord}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
      />

      {/* <WordsList data={wordsList} /> */}
    </main>
  );
}

export default App;
