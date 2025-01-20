const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./New folder/db");

const app = express();

// Middleware
app.use(bodyParser.json());

// Allow CORS for your frontend URL
app.use(
  cors({
    origin: "https://quiet-sunflower-336da4.netlify.app", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true, // Enable if cookies or authorization headers are used
  })
);

// API Endpoint
app.post("/api/chat", (req, res) => {
  const query = req.body.query;

  db.get(
    "SELECT answer FROM responses WHERE question = ?",
    [query],
    (err, row) => {
      if (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ answer: "Internal server error" });
      } else {
        res.json({ answer: row ? row.answer : "I didn't understand that." });
      }
    }
  );
});

// Use dynamic port for production
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
