// src/tools/searchUniqueField.js
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("./src/data/flowers.json", "utf8"));
const uniqueGroups = [...new Set(data.map((item) => item.flower_group))];
console.log(uniqueGroups);
