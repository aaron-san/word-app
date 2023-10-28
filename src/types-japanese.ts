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
  addJWord: boolean;
  setAddJWord: React.Dispatch<SetStateAction<boolean>>;
  searchJWord: string;
  setSearchJWord: React.Dispatch<SetStateAction<string>>;
  showJResults: boolean;
  setShowJResults: React.Dispatch<SetStateAction<boolean>>;
}

export interface IAddJWord {
  addJWord: boolean;
  setAddJWord: React.Dispatch<SetStateAction<boolean>>;
  showJResults: boolean;
  setShowJResults: React.Dispatch<SetStateAction<boolean>>;
}

export interface IJDefaults {
  defaultWord?: string;
  defaultEnglish?: string;
  defaultJapanese?: string;
  defaultExample?: string;
  defaultPresent?: string;
  defaultTeForm?: string;
  defaultNegative?: string;
  defaultPast?: string;
  defaultPastNegative?: string;
  defaultPotential?: string;
  defaultImperative?: string;
  defaultVolitional?: string;
  defaultGroup?: string;
  defaultDesirative?: string;
  defaultConditional?: string;
  defaultPassive?: string;
  defaultCausative?: string;
  defaultCausativePassive?: string;
  defaultHonorific?: string;
  defaultHumble?: string;
  defaultMark?: boolean;
}

export interface IJForm {
  jDefaults?: IJDefaults;
  jMethodType: string;
  jIdToEdit?: string | null;
}
