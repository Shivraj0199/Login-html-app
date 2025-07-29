const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const getConnection = require("./db");

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../frontend")));

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const connection = await getConnection();

  connection.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) return res.status(500).json({ message: "DB Error" });
      if (results.length > 0)
        return res.json({ message: "Login successful!" });
      else return res.status(401).json({ message: "Invalid credentials" });
    }
  );
});

app.listen(5000, () => console.log("Server running on port 5000"));
