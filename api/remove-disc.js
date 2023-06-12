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
    const { userId, discName } = req.body;

    try {
      await pool.query(
        "DELETE FROM user_bags WHERE user_id = $1 AND disc_name = $2",
        [userId, discName]
      );

      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.json({ success: false, error: err.message });
    }
  }
};
