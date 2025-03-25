import React, { useState, useEffect } from "react";
import { IJWord } from "../types-japanese";

const JWordsList = ({ data }: { data: IJWord[] | null }) => {
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
              {word.word}: {word?.english}
            </div>
          );
        })}
    </div>
  );
};

export default JWordsList;
