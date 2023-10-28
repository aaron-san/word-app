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
  sDefaults?: ISDefaults;
  sMethodType: string;
  sIdToEdit?: string | null;
}
