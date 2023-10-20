const fs = require("fs");
const path = require("path");
const jsonexport = require("jsonexport");

// module.exports = (req, res, next) => {
//   res.header("X-Hello", "World");
const JSONFile = fs.readFileSync(path.join(__dirname, "./db.json")); // Read the file synchronously.

const JSONasPOJO = JSON.parse(JSONFile);
//   res.send(JSONasPOJO);
const words = JSONasPOJO.words;
// delete words.id;
// !!! convert object to csv-friendly structure !!!

jsonexport(words, function (err, csv) {
  if (err) return console.error(err);
  if (words.length < 4000) return;

  // const zeroPad = (num, places) => String(num).padStart(places, "0") // 2 --> 02

  const date = new Date();
  const cleanDate =
    date.getFullYear() + // getFullYear() => 2023
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") + // getMonth() => 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
    "-" +
    (date.getDay() + 7 + 1).toString().padStart(2, "0");

  const filenames = [
    `./Backup/words - backup (${cleanDate}).csv`,
    path.join(
      "C:/Users/user/Desktop/Aaron/English/Backup",
      `words - backup (${cleanDate}).csv`
    ),
  ];
  // if (fs.existsSync())
  for (let filename of filenames) {
    fs.writeFile(filename, csv, function (err) {
      if (err) return console.error(err);
      console.log(`${filename} saved`);
    });
  }
});

//   next();
// };
