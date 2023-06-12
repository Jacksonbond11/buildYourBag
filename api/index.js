const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const app = express();
const bcrypt = require("bcryptjs");
const port = 3000;
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

app.use(express.json()); // Add this line
app.use(
  cors({
    origin: "http://127.0.0.1:5500", // replace with the origin of your front end
  })
);

app.get("/search", async (req, res) => {
  console.log("SEARCH CALLED");
  const query = req.query.q;
  console.log(query);
  const result = await pool.query(
    "SELECT name FROM discs WHERE name ILIKE $1 LIMIT 10",
    ["%" + query + "%"]
  );
  res.json(result.rows);
  console.log("results: " + result);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/discdata", async (req, res) => {
  console.log("Clicked disc");
  const discname = req.query.q;
  const result = await pool.query(
    `SELECT name, brand, category, speed, glide, turn, fade, pic, purchase_url FROM discs WHERE name = $1`,
    [discname]
  );
  res.json(result.rows);
});

//add user bag info to database
app.post("/add-disc", authenticateToken, async (req, res) => {
  console.log("add disc called");
  const discName = req.body.discName;
  let userId = req.userId;
  try {
    await pool.query(
      "INSERT INTO user_bags (user_id, disc_name) VALUES ($1, $2)",
      [userId, discName]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

app.get("/get-discs", authenticateToken, async (req, res) => {
  let userId = req.userId;
  console.log("get discs called with user id " + userId); // Grab the userId from the request parameters
  try {
    const result = await pool.query(
      "SELECT disc_name FROM user_bags WHERE user_id = $1",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving discs." });
  }
});

app.delete("/remove-disc", authenticateToken, async (req, res) => {
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
});

app.get("/get-category-count", authenticateToken, async (req, res) => {
  let userId = req.userId; // Get the userId from the request query parameters
  console.log("get disc stats called with user id " + userId);
  try {
    const result = await pool.query(
      "SELECT category, COUNT(*) as count FROM user_bags ub LEFT JOIN discs d ON d.name = ub.disc_name WHERE user_id = $1 GROUP BY category",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving disc stats." });
  }
});

app.get("/get-average-speed", authenticateToken, async (req, res) => {
  let userId = req.userId;
  console.log("get average called with user id of " + userId);
  try {
    const result = await pool.query(
      `SELECT category, Round(AVG(speed),2) 
      FROM user_bags ub LEFT JOIN discs d ON d.name = ub.disc_name 
      WHERE user_id = $1 
      GROUP BY category`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the average speed." });
  }
});

app.post("/createAccount", async (req, res) => {
  console.log("createAccount called");
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
});

app.post("/login", async (req, res) => {
  console.log("login called");
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
});

app.get("/userinfo", authenticateToken, async (req, res) => {
  let userId = req.userId;
  try {
    const result = await pool.query(`SELECT * FROM users WHERE userid = $1`, [
      userId,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = result.rows[0];
    res.json({
      message: "User info retrieved successfully",
      username: user.username,
      // Any other user info you'd like to return
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving user info" });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.userId = user.userId; // We are assuming user here is an object with a property 'userId'
    next();
  });
}
