import React, { createContext, useState } from "react";


interface IWord {
    id: number;
    word: string;
    meaning: string;
  }

  type IWordsContextType = {
    words: IWord[];
  }

const WordProvider: React.FC<React.ReactNode> = ({children}) => {
    const [words, setWords] = useState<IWord[]>([
        id: 1,
        word: "sophisticated",
        meaning: "intelligent, consisting of complex matter",
    ])
    

}


export const MyContext = createContext<IWordsContextType | null>(null);

export const ContextProvider = ({ children: any }) => {

    

  return (
    <MyContext.Provider value={[books, setbooks]}>
      {children}
    </MyContext.Provider>
  );
};
