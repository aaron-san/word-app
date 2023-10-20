/* tslint:disable */
var XLSX = require("xlsx");
var fs = require("fs");

const workbook = XLSX.readFile(
  "C:/Users/user/Desktop/Aaron/--- Quotes ---.xlsx"
);
let worksheet = workbook.Sheets[workbook.SheetNames[0]];
let range = worksheet["!ref"];
// let decodedRange = XLSX.utils.decode_range(range);

colStart = range.split(":")[0].match(/[a-z]/gi).join("");
// "A"
rowStart = range.split(":")[0].match(/\d/gi).join("");
// "1"
colEnd = range.split(":")[1].match(/[a-z]/gi).join("");
// "AMI"
rowEnd = range.split(":")[1].match(/\d/gi).join("");
// "11056"
// console.log(range);

// Manually define the cell arrays to read
// worksheet["!ref"] = colStart + rowStart + ":" + "B" + "4000";

let jsObj = XLSX.utils.sheet_to_json(worksheet);

fs.writeFileSync("data/quotes/quotes.json", JSON.stringify(jsObj));
