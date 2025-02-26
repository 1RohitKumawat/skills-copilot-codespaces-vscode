// Create web server with express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(bodyParser.json());

app.get("/comments", (req, res) => {
  fs.readFile("comments.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading comments.json");
      return;
    }
    res.send(data);
  });
});

app.post("/comments", (req, res) => {
  fs.readFile("comments.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading comments.json");
      return;
    }
    const comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile("comments.json", JSON.stringify(comments), (err) => {
      if (err) {
        res.status(500).send("Error writing comments.json");
        return;
      }
      res.send("Comment added");
    });
  });
});

app.listen(3000);