// import { data } from "autoprefixer";

const fs = require("fs");
const path = require("path");
const jsonexport = require("jsonexport");
const { ROOT_DIRECTORY } = require("./constants");
// let converter = require("json-2-csv");

// module.exports = (req, res, next) => {
//   res.header("X-Hello", "World");
const JSONFile = fs.readFileSync(path.join(__dirname, "./db.json")); // Read the file synchronously.

const JSONasPOJO = JSON.parse(JSONFile);
// delete JSONasPOJO["english-words"].id;
JSONasPOJO["english-words"].map((word) => {
  word.mark = word.mark ? word.mark : "";
  // word.mark = word.mark?.replaceAll(false, "");
  delete word.id;
});
JSONasPOJO["japanese-words"].map((word) => {
  word.mark = word.mark ? word.mark : "";
  // word.mark = word.mark?.replaceAll(false, "");
  delete word.id;
});
JSONasPOJO["spanish-words"].map((word) => {
  word.mark = word.mark ? word.mark : "";
  // console.log(word.mark);
  delete word.id;
});

// console.log(JSONasPOJO["japanese-words"]);

// JSONasPOJO["japanese-words"].map((el) => {
//   el.japanese = el.japanese?.toString();
// });

// console.log(JSONasPOJO);
//   res.send(JSONasPOJO);

// delete words.id;
// !!! convert object to csv-friendly structure !!!

const dataToExport = [
  {
    data: JSONasPOJO["english-words"],
    filename: "english-words",
    localDirectory: path.join(ROOT_DIRECTORY, "English/Backup"),
    minWordsSafeOverWrite: 4000,
  },
  {
    data: JSONasPOJO["japanese-words"],
    filename: "japanese-words",
    localDirectory: path.join(ROOT_DIRECTORY, "/Japanese/Backup"),
    minWordsSafeOverWrite: 4500,
  },
  {
    data: JSONasPOJO["spanish-words"],
    filename: "spanish-words",
    localDirectory: path.join(ROOT_DIRECTORY, "/Spanish/Backup"),
    minWordsSafeOverWrite: 1000,
  },
];

const exportToExcel = (
  words,
  filename,
  localDirectory,
  minWordsSafeOverWrite
) => {
  jsonexport(words, function (err, csv) {
    if (err) return console.error(err);
    if (words.length < minWordsSafeOverWrite) return;
    // const zeroPad = (num, places) => String(num).padStart(places, "0") // 2 --> 02
    const date = new Date();
    const cleanDate =
      date.getFullYear() + // getFullYear() => 2023
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") + // getMonth() => 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
      "-" +
      (date.getDay() + 21 + 1).toString().padStart(2, "0");

    const filenames = [
      `./Backup/${filename} - backup (${cleanDate}).csv`,
      path.join(localDirectory, `${filename} - backup (${cleanDate}).csv`),
    ];
    // if (fs.existsSync())
    // Write data two two separate locations (2 backups)
    for (let filename of filenames) {
      fs.writeFile(
        filename,
        "\ufeff" + csv,
        { encoding: "utf8" },
        function (err) {
          if (err) return console.error(err);
          console.log(`${filename} saved`);
        }
      );
    }
  });
};

dataToExport.forEach((el) =>
  exportToExcel(
    el.data,
    el.filename,
    el.localDirectory,
    el.minWordsSafeOverWrite
  )
);
// dataToExport.forEach((el) => converter.json2csv(el.data, json2CSVCallback()));
//   next();
// };
