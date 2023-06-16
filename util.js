const fs = require("fs");

// Read the JSON file
fs.readFile("disc.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  // Parse the JSON
  const jsonData = JSON.parse(data);
  const discNames = jsonData["SELECT (brand || '-' || name) FROM discs"].map(
    (disc) => disc["?column?"].replace(/ /g, "-").replace(/'/g, "\\'")
  );

  // Convert the array into a string that can be used as an array in another place
  const discNamesStr = discNames.map((name) => `'${name}',`).join(" ");

  // Output the result
  console.log(discNamesStr);
});
