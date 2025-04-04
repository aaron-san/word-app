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
  // wordsList?: IWord[];
  // setWordsList?: React.Dispatch<SetStateAction<IWord[]>>;
  addWord: boolean;
  setAddWord: React.Dispatch<SetStateAction<boolean>>;
  searchWord: string;
  setSearchWord: React.Dispatch<SetStateAction<string>>;
  showResults: boolean;
  setShowResults: React.Dispatch<SetStateAction<boolean>>;
}

export interface IAddWord {
  addWord: boolean;
  setAddWord: React.Dispatch<SetStateAction<boolean>>;
  showResults: boolean;
  setShowResults: React.Dispatch<SetStateAction<boolean>>;
}

export interface IDefaults {
  defaultWord?: string;
  defaultDefinition?: string;
  defaultPronunciation?: string;
  defaultExample?: string;
  defaultMark?: boolean;
}

export interface IForm {
  language: "english" | "japanese" | "spanish";
  defaults?: IDefaults;
  methodType: string;
  idToEdit?: string | null;
}
