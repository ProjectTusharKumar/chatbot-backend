const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/api/chat", (req, res) => {
  const query = req.body.query;

  db.get(
    "SELECT answer FROM responses WHERE question = ?",
    [query],
    (err, row) => {
      if (err) {
        res.status(500).json({ answer: "Internal server error" });
      } else {
        res.json({ answer: row ? row.answer : "I didn't understand that." });
      }
    }
  );
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
