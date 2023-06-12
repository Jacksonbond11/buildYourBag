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
    let { email, password } = req.body;

    try {
      const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
        email,
      ]);
      if (result.rows.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Login successful
      const payload = { userId: user.userid }; // Changed this from email to userId
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
      res.json({
        message: "Login successful",
        username: user.username,
        accessToken: accessToken,
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "An error occurred while logging in" });
    }
  }
};
