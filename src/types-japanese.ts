import { SetStateAction } from "react";

export interface IJWord {
  id: string;
  word: string;
  english: string;
  japanese: string;
  example: string;
  present: string;
  teForm: string;
  negative: string;
  past: string;
  pastNegative: string;
  potential: string;
  imperative: string;
  volitional: string;
  group: string;
  desirative: string;
  conditional: string;
  passive: string;
  causative: string;
  causativePassive: string;
  honorific: string;
  humble: string;
  mark: boolean;
}

export interface IJWords {
  jWordsList: IJWord[];
  setJWordsList: React.Dispatch<SetStateAction<IJWord[]>>;
  addJWord: boolean;
  setAddJWord: React.Dispatch<SetStateAction<boolean>>;
  searchJWord: string;
  setSearchJWord: React.Dispatch<SetStateAction<string>>;
  showJResults: boolean;
  setShowJResults: React.Dispatch<SetStateAction<boolean>>;
}

export interface IAddJWord {
  jWordsList: IJWord[];
  setJWordsList: React.Dispatch<SetStateAction<IJWord[]>>;
  addJWord: boolean;
  setAddJWord: React.Dispatch<SetStateAction<boolean>>;
  showJResults: boolean;
  setShowJResults: React.Dispatch<SetStateAction<boolean>>;
}

export interface IJDefaults {
  defaultWord: string | null;
  defaultEnglish: string | null;
  defaultJapanese: string | null;
  defaultExample: string | null;
  defaultPresent: string | null;
  defaultTeForm: string | null;
  defaultNegative: string | null;
  defaultPast: string | null;
  defaultPastNegative: string | null;
  defaultPotential: string | null;
  defaultImperative: string | null;
  defaultVolitional: string | null;
  defaultGroup: string | null;
  defaultDesirative: string | null;
  defaultConditional: string | null;
  defaultPassive: string | null;
  defaultCausative: string | null;
  defaultCausativePassive: string | null;
  defaultHonorific: string | null;
  defaultHumble: string | null;
  defaultMark: boolean | null;
}

export interface IJForm {
  // wordsList: IWord[];
  setJWordsList: React.Dispatch<SetStateAction<IJWord[]>>;
  // addWord: boolean;
  setAddJWord: React.Dispatch<SetStateAction<boolean>>;
  setEditJWordMode?: React.Dispatch<SetStateAction<boolean>>;
  setSearchJWord?: React.Dispatch<SetStateAction<string>>;
  jDefaults?: IJDefaults;
  jMethodType: string;
  jIdToEdit?: string | null;
  showJResults: boolean;
  setShowJResults: React.Dispatch<SetStateAction<boolean>>;
}
