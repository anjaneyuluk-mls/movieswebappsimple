const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
const port = 4000;

app.get("/movies", (req, res) => {
  fs.readFile(path.join(__dirname, "movies.json"), "utf8", (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.post("/movie", (req, res) => {
  fs.readFile(path.join(__dirname, "movies.json"), "utf8", (error, data) => {
    const movies = JSON.parse(data);
    console.log("body", req.body);
    movies.push(req.body.name);
    fs.writeFile(
      path.join(__dirname, "movies.json"),
      JSON.stringify(movies),
      "utf8",
      () => {
        res.json({ status: "success" });
      }
    );
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log("I am listeneing at port", port);
});
