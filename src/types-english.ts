import { SetStateAction } from "react";

export interface IWord {
  id: string;
  word: string;
  mark: boolean;
  definition: string;
  pronunciation: string;
  example: string;
}

export interface IWords {
  wordsList: IWord[];
  setWordsList: React.Dispatch<SetStateAction<IWord[]>>;
  addWord: boolean;
  setAddWord: React.Dispatch<SetStateAction<boolean>>;
  searchWord: string;
  setSearchWord: React.Dispatch<SetStateAction<string>>;
  showResults: boolean;
  setShowResults: React.Dispatch<SetStateAction<boolean>>;
}

export interface IAddWord {
  wordsList: IWord[];
  setWordsList: React.Dispatch<SetStateAction<IWord[]>>;
  addWord: boolean;
  setAddWord: React.Dispatch<SetStateAction<boolean>>;
  showResults: boolean;
  setShowResults: React.Dispatch<SetStateAction<boolean>>;
}

export interface IDefaults {
  defaultWord: string | null;
  defaultDefinition: string | null;
  defaultPronunciation: string | null;
  defaultExample: string | null;
  defaultMark: boolean | null;
}

export interface IForm {
  // wordsList: IWord[];
  setWordsList: React.Dispatch<SetStateAction<IWord[]>>;
  // addWord: boolean;
  setAddWord: React.Dispatch<SetStateAction<boolean>>;
  setEditWordMode?: React.Dispatch<SetStateAction<boolean>>;
  setSearchWord?: React.Dispatch<SetStateAction<string>>;
  defaults?: IDefaults;
  methodType: string;
  idToEdit?: string | null;
  showResults: boolean;
  setShowResults: React.Dispatch<SetStateAction<boolean>>;
}
