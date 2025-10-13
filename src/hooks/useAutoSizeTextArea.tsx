// import { useEffect, useRef } from "react";

// const useAutosizeTextArea = (
//   value: string | null | undefined,
//   extra = 20
// ) => {
//   const ref = useRef<HTMLTextAreaElement | null>(null);

//   useEffect(() => {
//     if (ref.current) {
//       ref.current.style.height = "auto"; // reset
//       ref.current.style.height = ref.current.scrollHeight + extra + "px";
//     }
//   }, [value, extra]); // runs on mount + whenever the value changes

//   return ref;
// };

// export default useAutosizeTextArea;