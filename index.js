const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "CORS Proxy is running!" });
});

app.get("/proxy", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: "Missing 'url' parameter" });
  }

  try {
    const response = await fetch(url);
    const data = await response.text(); // Use .text() to support all content types
    res.set("Access-Control-Allow-Origin", "*");
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`CORS Proxy running on port ${port}`));
