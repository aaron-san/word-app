/* tslint:disable */
import XLSX from "xlsx";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { ROOT_DIRECTORY } from "../constants";

const workbook = XLSX.readFile(
  ROOT_DIRECTORY + "/Spanish/--- Spanish ---.xlsx"
);
let worksheet = workbook.Sheets[workbook.SheetNames[0]];
let range = worksheet["!ref"];
// let decodedRange = XLSX.utils.decode_range(range);
// console.log(range);

// const colStart = range.split(":")[1].match(/[a-z]/gi).join("");
const colStart = "A";
// console.log(colStart);
// const rowStart = range.split(":")[1].match(/\d/gi).join("");
const rowStart = 1;
// console.log(rowStart);
// const colEnd = range.split(":")[1].match(/[a-z]/gi).join("");
const colEnd = "J";
// console.log(colEnd);
const rowEnd = range.split(":")[1].match(/\d/gi).join("");
// console.log(rowEnd);

// Manually define the cell arrays to read
worksheet["!ref"] = colStart + rowStart + ":" + colEnd + rowEnd;

let jsObj = XLSX.utils.sheet_to_json(worksheet);

jsObj.map((w) => {
  w.id = uuidv4();
  w.word = w.word ? w.word : null;
  w.definition = w.definition ? w.definition : null;
  w.example = w.example ? w.example : null;
  w.present = w.present ? w.present : null;
  w.past = w.past ? w.past : null;
  w.conditional = w.conditional ? w.conditional : null;
  w.subjunctive = w.subjunctive ? w.subjunctive : null;
  w.future = w.future ? w.future : null;
  w.imperfect = w.imperfect ? w.imperfect : null;
  w.continuousProgressive = w.continuousProgressive
    ? w.continuousProgressive
    : null;
  w.mark = w.mark ? true : false;
});

// console.log(jsObj.slice(0, 5));

// Save to json file
fs.writeFileSync("data/spanish/spanish.json", JSON.stringify(jsObj));
