// import { useContext } from "react";
// import Form from "./english/Form";
// import { MyGlobalContext } from "../App";

// // export type FormValues = {
// //   word: string;
// //   mark: boolean;
// //   definition: string;
// //   pronunciation: string;
// //   example: string;
// // };
// const AddWord = ({ language }: { language: "english" | "japanese" | "spanish" }) => {
//   const { languagesState } = useContext(MyGlobalContext);

//   const defaults = {
//     defaultWord: languagesState[language]?.searchWord || "",
//   };

//   //   // Get updated words list from json server
//   //   const getWords = async () => {
//   //     const data = await fetch(`http://localhost:${SERVERPORT}/words`);
//   //     const words = await data.json();
//   //     setWordsList(words);
//   //   };
//   //   getWords();

//   //   setAddWord(false);
//   // };

//   return (

//      {language === "english" && (
//                           <Form
//                             defaults={defaults}
//                             // idToEdit={idToEdit}
//                             methodType="POST"
//                           />
//                         )}
//                         {language === "japanese" && (
//                           <JForm
//                             defaults={defaults}
//                             // idToEdit={idToEdit}
//                             methodType="POST"
//                           />
//   )}
//   )/>;
    
// };

// export default AddWord;
