// import { promises as fs } from "fs";
// import path from "path";

// const loadData = async () => {
//   const filePath = path.resolve("src/data/db.json");
//   try {
//     const data = await fs.readFile(filePath, "utf8");
//     return JSON.parse(data); // Convert string to JSON
//   } catch (err) {
//     console.error("Error reading the file:", err);
//   }
// };

// const data = await loadData();

// const english = data["english-words"]
//     .filter((i) => i.definition && i.pronunciation && i.example)
//     .slice(0,100);
// const japanese = data["japanese-words"]
//     .filter((i) => i.english && i.japanese && i.example)
//     .slice(0,100);
// const spanish = data["spanish-words"]
//     .filter((i) => i.definition && i.example)
//     .slice(0,100);

// const dbData = {"english-words": english,
//     "japanese-words": japanese,
//     "spanish-words": spanish
// }


// const filePath = path.resolve("src/data/db-sample.json");
//   try {
//     await fs.writeFile(filePath, JSON.stringify(dbData), "utf8");
//   } catch(err) {
//     console.log(err);
//   }