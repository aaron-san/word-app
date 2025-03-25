const str = "onions; potatoes; ginger;";
function formatIngredients(str) {
  return str
    .split(";")
    .map((el) => el.trim())
    .filter((el) => el !== "");
}
console.log(formatIngredients(str));
