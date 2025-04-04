
import {IWord} from "./types-english"
import {IJWord} from "./types-japanese"
import {ISWord} from "./types-spanish"

export interface ILanguageState {
    wordsList: IWord[] | IJWord[] | ISWord[];  // Or use IJWord and ISWord for respective languages
    searchWord: string | null;
    addWord: boolean;
    showResults: boolean;
    editWordMode: boolean;
    idToEdit: string | null;
    inputValue: string | null;
  }
  
  export interface GlobalContent {
    languagesState: {
      english: ILanguageState;
      japanese: ILanguageState;
      spanish: ILanguageState;
    };
    setLanguagesState: (state: GlobalContent["languagesState"]) => void;
  }
  