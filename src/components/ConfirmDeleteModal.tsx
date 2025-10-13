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
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-95">
      <div className="bg-red-300 p-6 border-2 border-slate-600 rounded-md w-[300px]">
        <h2 className="text-lg">Delete <span className="text-red-700 text-2xl">{word}</span>?</h2>
        
        <input
          type="text"
          id="deleteConfirmInput"
          className="mt-2 p-2 border border-gray-700 rounded ring-slate-500 text-slate-600 placeholder-slate-600"
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type 'DELETE' to confirm"
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onCancel}
            className="bg-gray-500 px-2 py-1 border border-white rounded text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => wordId && onConfirm(wordId)}
            className="bg-red-500 px-2 py-1 border border-white rounded text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
