require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// PostgreSQL Connection using .env
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Check PostgreSQL connection
pool.connect()
  .then(client => {
    console.log("PostgreSQL Connected Successfully ✅");
    client.release();
  })
  .catch(err => {
    console.error("PostgreSQL Connection Failed ❌", err.message);
  });

// Test route
app.get("/", (req, res) => {
  res.send("Server is running successfully 🚀");
});

// Contact form route
app.post("/contact", async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Debugging line

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).send("All fields are required ❗");
    }

    await pool.query(
      "INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );

    res.status(200).send("Message saved successfully ✅");

  } catch (err) {
    console.error("Error inserting data ❌", err.message);
    res.status(500).send("Error occurred while saving data");
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});