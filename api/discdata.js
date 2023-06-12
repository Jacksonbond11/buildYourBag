// /api/add-disc.js
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DATABASE_USER_SECRET,
  host: process.env.DATABASE_HOST_SECRET,
  database: process.env.DATABASE_DATABASE_SECRET,
  password: process.env.DATABASE_PASSWORD_SECRET,
  port: 26257,
  ssl: {
    rejectUnauthorized: false,
  },
});
async function authenticateToken(req, res) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return { status: "401" };

  let userId;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return { status: "403" };
    userId = user.userId;
  });

  return { userId };
}

module.exports = async (req, res) => {
  const authResult = await authenticateToken(req, res);

  if (authResult.status) {
    res.status(authResult.status).send();
  } else {
    console.log("Clicked disc");
    const discname = req.query.q;
    const result = await pool.query(
      `SELECT name, brand, category, speed, glide, turn, fade, pic, purchase_url FROM discs WHERE name = $1`,
      [discname]
    );
    res.json(result.rows);
  }
};
