const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./New folder/db");

const app = express();

// Middleware
app.use(bodyParser.json());

// CORS Configuration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://chatbot-frontend-kappa-seven.vercel.app"); // Replace with your frontend URL
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Handle preflight requests
  }
  next();
});

// API Endpoint
app.post("/api/chat", (req, res) => {
  const query = req.body.query;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ answer: "Invalid query format." });
  }

  db.get(
    "SELECT answer FROM responses WHERE question = ?",
    [query],
    (err, row) => {
      if (err) {
        console.error("Database error:", err.message);
        return res.status(500).json({ answer: "Internal server error." });
      }

      if (row) {
        res.json({ answer: row.answer });
      } else {
        res.json({ answer: "I didn't understand that." });
      }
    }
  );
});

// Port Configuration
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
