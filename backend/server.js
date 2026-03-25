const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",   // change if needed
  password: "TIGER",      // your password
  port: 5432,
});

// ✅ Test DB connection
pool.connect()
  .then(() => console.log("Connected to PostgreSQL ✅"))
  .catch(err => console.error("DB connection error ❌", err));

// ✅ Create table if not exists
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

pool.query(createTableQuery)
  .then(() => console.log("Table ready ✅"))
  .catch(err => console.error("Error creating table ❌", err));

// ✅ Root route (optional but useful)
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ✅ Contact form route
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // 🔒 Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required ❌"
    });
  }

  try {
    const query = `
      INSERT INTO messages (name, email, message)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const values = [name, email, message];

    const result = await pool.query(query, values);

    console.log("Data inserted:", result.rows[0]);

    res.status(200).json({
      success: true,
      message: "Message saved successfully ✅",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("Error inserting data ❌", error);

    res.status(500).json({
      success: false,
      message: "Server error ❌"
    });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🚀`);
});