import { SetStateAction } from "react";

export interface ISWord {
  id: string;
  word: string;
  definition: string | null;
  example: string | null;
  present: string | null;
  past: string | null;
  conditional: string | null;
  subjunctive: string | null;
  future: string | null;
  imperfect: string | null;
  continuousProgressive: string | null;
  mark: boolean | null;
}

export interface ISWords {
  addSWord: boolean;
  setAddSWord: React.Dispatch<SetStateAction<boolean>>;
  searchSWord: string;
  setSearchSWord: React.Dispatch<SetStateAction<string>>;
  showSResults: boolean;
  setShowSResults: React.Dispatch<SetStateAction<boolean>>;
}

// export interface IAddSWord {
// }

export interface ISDefaults {
  defaultWord?: string;
  defaultDefinition?: string;
  defaultExample?: string;
  defaultPresent?: string;
  defaultPast?: string;
  defaultConditional?: string;
  defaultSubjunctive?: string;
  defaultFuture?: string;
  defaultImperfect?: string;
  defaultContinuousProgressive?: string;
  defaultMark?: boolean;
}

export interface ISForm {
  word?: ISWord;
  defaults?: ISDefaults;
  methodType: string;
  idToEdit?: string | null;
}
