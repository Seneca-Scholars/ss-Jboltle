const express = require("express");

const things = require("./things.json");
const games = require("./games.json");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/things", (req, res) => {
    res.send(things);
    console.log(things);
});

app.get("/games", (req, res) => {
    res.send(games);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
