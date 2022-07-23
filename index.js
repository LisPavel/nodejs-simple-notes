const chalk = require("chalk");
const express = require("express");
// const path = require("path");

const { addNote, getNotes } = require("./notes.controller");

const PORT = 3000;
const APP_NAME = "Express notes";
// const pagesPath = path.resolve(__dirname, "pages");
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", async (req, res) => {
    res.render("index", {
        title: APP_NAME,
        notes: await getNotes(),
    });
    // res.sendFile(path.resolve(pagesPath, "index.html"));
});

app.post("/", async (req, res) => {
    await addNote(req.body.title);
    res.render("index", {
        title: APP_NAME,
        notes: await getNotes(),
    });
    // res.sendFile(path.resolve(pagesPath, "index.html"));
});

app.listen(PORT, () => {
    console.log(chalk.bgGreen(`server listening on port ${PORT}`));
});
