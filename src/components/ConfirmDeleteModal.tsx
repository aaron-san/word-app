import { useState } from "react";

type ConfirmDeleteModalProps = {
  isOpen: boolean;
  onConfirm: (id: string) => void;
  onCancel: () => void;
  wordId?: string;
  word: string;
  setInputValue: (input: string) => void;
};

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  wordId,
  word,
  setInputValue,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-slate-200 p-6 rounded-md w-[300px]">
        <h2 className="text-lg">Delete {word}?</h2>
        <p>Type 'DELETE' to confirm.</p>
        <input
          type="text"
          id="deleteConfirmInput"
          className="mt-2 p-2 border border-gray-300 ring-slate-500"
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type 'DELETE' to confirm"
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => wordId && onConfirm(wordId)}
            className="bg-red-500 text-white p-2 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
