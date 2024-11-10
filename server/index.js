// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  
app.get("/api/test-connection", (req, res) => {
    res.json({ message: "Connection to /api/test-connection is successful!" });
  });
  
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});