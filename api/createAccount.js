// /api/add-disc.js
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const pool = new Pool({
  // pool config...
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
    let { email, username, password, creation_date } = req.body;

    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      const result = await pool.query(
        `INSERT INTO users (email, username, password, salt, creation_date) VALUES ($1, $2, $3, $4, $5) RETURNING userid, username`,
        [email, username, hashedPassword, salt, creation_date]
      );
      const user = result.rows[0];
      const payload = { userId: user.userid }; // Changed this from email to userId
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
      console.log(user.username);
      res.json({
        message: "Login successful",
        username: user.username,
        accessToken: accessToken,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while creating the account." });
    }
  }
};
