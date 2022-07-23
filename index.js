const chalk = require("chalk");
const express = require("express");
const path = require("path");
// const path = require("path");

const {
    addNote,
    getNotes,
    removeNote,
    updateNote,
} = require("./notes.controller");

const PORT = 3000;
const APP_NAME = "Express notes";
// const pagesPath = path.resolve(__dirname, "pages");
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.join(__dirname, "public")));
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

app.get("/", async (req, res) => {
    res.render("index", {
        title: APP_NAME,
        notes: await getNotes(),
        created: false,
    });
    // res.sendFile(path.resolve(pagesPath, "index.html"));
});

app.post("/", async (req, res) => {
    await addNote(req.body.title);
    res.render("index", {
        title: APP_NAME,
        notes: await getNotes(),
        created: true,
    });
    // res.sendFile(path.resolve(pagesPath, "index.html"));
});

app.delete("/:id", async (req, res) => {
    const id = req.params.id;

    await removeNote(id);

    res.render("index", {
        title: APP_NAME,
        notes: await getNotes(),
        created: false,
    });
});

app.put("/:id", async (req, res) => {
    console.log(req.params.id, req.body);
    await updateNote(req.params.id, req.body.title);
    res.render("index", {
        title: APP_NAME,
        notes: await getNotes(),
        created: false,
    });
});

app.listen(PORT, () => {
    console.log(chalk.bgGreen(`server listening on port ${PORT}`));
});
