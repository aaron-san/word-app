import { SetStateAction } from "react";

export interface ISWord {
  id: string;
  word: string;
  definition: string;
  example: string;
  present: string;
  past: string;
  conditional: string;
  subjunctive: string;
  future: string;
  imperfect: string;
  continuousProgressive: string;
  mark: boolean;
}

export interface ISWords {
  sWordsList: ISWord[];
  setSWordsList: React.Dispatch<SetStateAction<ISWord[]>>;
  addSWord: boolean;
  setAddSWord: React.Dispatch<SetStateAction<boolean>>;
  searchSWord: string;
  setSearchSWord: React.Dispatch<SetStateAction<string>>;
  showSResults: boolean;
  setShowSResults: React.Dispatch<SetStateAction<boolean>>;
}

export interface IAddSWord {
  sWordsList: ISWord[];
  setSWordsList: React.Dispatch<SetStateAction<ISWord[]>>;
  addSWord: boolean;
  setAddSWord: React.Dispatch<SetStateAction<boolean>>;
  showSResults: boolean;
  setShowSResults: React.Dispatch<SetStateAction<boolean>>;
}

export interface ISDefaults {
  defaultWord: string | null;
  defaultDefinition: string | null;
  defaultExample: string | null;
  defaultPresent: string | null;
  defaultPast: string | null;
  defaultConditional: string | null;
  defaultSubjunctive: string | null;
  defaultFuture: string | null;
  defaultImperfect: string | null;
  defaultContinuousProgressive: string | null;
  defaultMark: boolean | null;
}

export interface ISForm {
  // wordsList: IWord[];
  setSWordsList: React.Dispatch<SetStateAction<ISWord[]>>;
  // addWord: boolean;
  setAddSWord: React.Dispatch<SetStateAction<boolean>>;
  setEditSWordMode?: React.Dispatch<SetStateAction<boolean>>;
  setSearchSWord?: React.Dispatch<SetStateAction<string>>;
  sDefaults?: ISDefaults;
  sMethodType: string;
  sIdToEdit?: string | null;
  showSResults: boolean;
  setShowSResults: React.Dispatch<SetStateAction<boolean>>;
}
