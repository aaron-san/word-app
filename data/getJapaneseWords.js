/* tslint:disable */
import XLSX from "xlsx";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";

const workbook = XLSX.readFile(
  ROOT_DIRECTORY + "/Japanese/--- Japanese ---.xlsx"
);
let worksheet = workbook.Sheets[workbook.SheetNames[0]];
let range = worksheet["!ref"];
// let decodedRange = XLSX.utils.decode_range(range);
// console.log(range);

// const colStart = range.split(":")[1].match(/[a-z]/gi).join("");
const colStart = "A";
// console.log(colStart);
// const rowStart = range.split(":")[1].match(/\d/gi).join("");
const rowStart = 2;
// console.log(rowStart);
// const colEnd = range.split(":")[1].match(/[a-z]/gi).join("");
const colEnd = "T";
// console.log(colEnd);
const rowEnd = range.split(":")[1].match(/\d/gi).join("");
// console.log(rowEnd);

// Manually define the cell arrays to read
worksheet["!ref"] = colStart + rowStart + ":" + colEnd + rowEnd;

let jsObj = XLSX.utils.sheet_to_json(worksheet);

jsObj.map((w) => {
  w.id = uuidv4();
  w.word = w.word ? w.word : null;
  w.english = w.english ? w.english : null;
  w.japanese = w.japanese ? w.japanese : null;
  w.example = w.example ? w.example : null;
  w.present = w.present ? w.present : null;
  w.teForm = w.teForm ? w.teForm : null;
  w.negative = w.negative ? w.negative : null;
  w.past = w.past ? w.past : null;
  w.pastNegative = w.pastNegative ? w.pastNegative : null;
  w.potential = w.potential ? w.potential : null;
  w.imperative = w.imperative ? w.imperative : null;
  w.volitional = w.volitional ? w.volitional : null;
  w.group = w.group ? w.group : null;
  w.desirative = w.desirative ? w.desirative : null;
  w.conditional = w.conditional ? w.conditional : null;
  w.passive = w.passive ? w.passive : null;
  w.causative = w.causative ? w.causative : null;
  w.causativePassive = w.causativePassive ? w.causativePassive : null;
  w.honorific = w.honorific ? w.honorific : null;
  w.humble = w.enhumble ? w.englhumble : null;
  w.mark = w.mark ? true : false;
});

// console.log(jsObj.slice(0, 5));

// Save to json file
fs.writeFileSync("data/japanese/japanese.json", JSON.stringify(jsObj));
