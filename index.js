const chalk = require("chalk");
const express = require("express");
// express
// const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const { addNote } = require("./notes.controller");

const PORT = 3000;

const pagesPath = path.resolve(__dirname, "pages");

const app = express();

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.sendFile(path.resolve(pagesPath, "index.html"));
});

app.post("/", async (req, res) => {
    // console.log(req.body);
    await addNote(req.body.title);
    res.sendFile(path.resolve(pagesPath, "index.html"));
});

app.listen(PORT, () => {
    console.log(chalk.bgGreen(`server listening on port ${PORT}`));
});
