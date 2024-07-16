import React, { useState, useEffect } from "react";
import { IWord } from "../types-english";

// console.log(initialWords[0]);
const WordsList = ({ data }: { data: IWord[] | null }) => {
  // console.log("WordsList");
  // const [wordsList, setWordsList] = useState<IWord[] | null>(null);

  // useEffect(() => {
  //   const getWords = async () => {
  //     const data = await fetch(`http://localhost:${SERVERPORT}/words`);
  //     const words = await data.json();
  //     setWordsList(words);
  //   };
  //   getWords();
  // }, []);

  return (
    <div>
      {data
        ?.filter((w) => w.mark == true)
        .slice(0, 10)
        .map((word) => {
          return (
            <div key={word.id} className="max-w-lg m-2">
              {word.word}: {word?.definition}
            </div>
          );
        })}
    </div>
  );
};

export default WordsList;
