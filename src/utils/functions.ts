import React from "react";
import { IWord } from "../../types/types-english";
import { IJWord } from "../../types/types-japanese";
import { ISWord } from "../../types/types-spanish";
import { SERVERPORT } from "../utils/constants";

interface RequestProps {
  language: "english" | "japanese" | "spanish";
  word?: IWord | IJWord | ISWord;
  idToDelete?: string;
}

export const sendPostRequest = async ({ language, word }: RequestProps) => {
    console.log("Sending post request");
  // const response =
  await fetch(`http://localhost:${SERVERPORT}/${language}-words`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(word),
  });

  //   const data = await response.json();
  //   console.log("Created:", data);
};

export const sendPutRequest = async ({ language, word }: RequestProps) => {
    console.log("Sending PUT request");
  // const response =
  if (!word) return;
  await fetch(`http://localhost:${SERVERPORT}/${language}-words/${word.id}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(word),
  });

  //   const data = await response.json();
  //   console.log("Created:", data);
};

export const sendDeleteRequest = async ({
  language,
  idToDelete,
}: RequestProps) => {
  await fetch(`http://localhost:${SERVERPORT}/${language}-words/${idToDelete}`, {
    method: "DELETE",
  });
};


export const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight + 20}px`;
}
