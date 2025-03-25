/* tslint:disable */
import XLSX from "xlsx";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { ROOT_DIRECTORY } from "../constants";

const workbook = XLSX.readFile(
  ROOT_DIRECTORY + "/English/--- English ---.xlsx"
);
let worksheet = workbook.Sheets[workbook.SheetNames[0]];
let range = worksheet["!ref"];
// let decodedRange = XLSX.utils.decode_range(range);
// console.log(range);

// const colStart = range.split(":")[1].match(/[a-z]/gi).join("");
const colStart = "B";
// console.log(colStart);
// const rowStart = range.split(":")[1].match(/\d/gi).join("");
const rowStart = 2;
// console.log(rowStart);
// const colEnd = range.split(":")[1].match(/[a-z]/gi).join("");
const colEnd = "F";
// console.log(colEnd);
const rowEnd = range.split(":")[1].match(/\d/gi).join("");
// console.log(rowEnd);

// Manually define the cell arrays to read
worksheet["!ref"] = colStart + rowStart + ":" + colEnd + rowEnd;

let jsObj = XLSX.utils.sheet_to_json(worksheet);

jsObj.map((w) => {
  w.id = uuidv4();
  w.mark = w.mark ? true : false;
  w.definition = w.definition ? w.definition : null;
  w.pronunciation = w.pronunciation ? w.pronunciation : null;
  w.example = w.example ? w.example : null;
});

// console.log(jsObj.slice(0, 5));

// Save to json file
fs.writeFileSync("data/english/english.json", JSON.stringify(jsObj));
