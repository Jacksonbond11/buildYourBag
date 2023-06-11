const fs = require("fs");
const { Pool } = require("pg");

// Read the JSON file
const jsonData = fs.readFileSync("discdata.json");
const discsData = JSON.parse(jsonData);

// Create a new PostgreSQL connection pool
const pool = new Pool({
  user: "jb",
  host: "slimy-tang-10041.7tt.cockroachlabs.cloud",
  database: "discs",
  password: "kUGR-R2q2whvbHPyxjtKgA",
  port: 26257,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Connect to the CockroachDB
pool
  .connect()
  .then(() => {
    console.log("Connected to CockroachDB");

    // Insert data into the database
    console.log("Beginning insert");

    async function insertDiscs() {
      for (let i = 0; i < discsData.length; i++) {
        const disc = discsData[i];
        try {
          const query =
            "INSERT INTO discs (id, name, brand, category, speed, glide, turn, fade, stability, link, pic, name_slug, brand_slug, category_slug, stability_slug, color, background_color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)";
          const values = [
            disc.id,
            disc.name,
            disc.brand,
            disc.category,
            disc.speed,
            disc.glide,
            disc.turn,
            disc.fade,
            disc.stability,
            disc.link,
            disc.pic,
            disc.name_slug,
            disc.brand_slug,
            disc.category_slug,
            disc.stability_slug,
            disc.color,
            disc.background_color,
          ];

          await pool.query(query, values);
          console.log(`Inserted disc: ${disc.name}`);
        } catch (error) {
          console.error(`Error inserting disc: ${disc.name}`, error);
        }
      }
    }

    // Call the insertDiscs function
    insertDiscs()
      .then(() => {
        console.log("All discs inserted successfully");
        // Close the connection pool
        pool.end();
      })
      .catch((error) => {
        console.error("Error inserting discs:", error);
        // Close the connection pool
        pool.end();
      });
  })
  .catch((error) => {
    console.error("Error connecting to CockroachDB:", error);
    // Close the connection pool
    pool.end();
  });
