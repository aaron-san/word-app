import React, { ChangeEvent } from "react";

interface IWord {
  value: string;
  setValue: (e: string) => void;
  arrayValue: string;
  editMode: boolean;
}

// Function to create an editable input box
// Inputs: value (a state value)
//         setValue (a function to set state)
const InlineEditWord = ({ value, setValue, arrayValue, editMode }: IWord) => {
  console.log("InlineEditWord - Japanese");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  return (
    <div>
      {editMode && (
        <input
          type="text"
          aria-label="Field name"
          value={value}
          onChange={onChange}
        />
      )}
      {!editMode && <div>{arrayValue}</div>}
    </div>
  );
};

export default InlineEditWord;
