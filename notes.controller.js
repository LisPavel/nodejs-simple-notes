const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
// const notes = [];
const notesPath = path.join(__dirname, "db.json");

async function getNotes() {
    const notesStr = await fs.readFile(notesPath, { encoding: "utf-8" });
    const notes = JSON.parse(notesStr);
    return Array.isArray(notes) ? notes : [];
}

async function addNote(title) {
    // const notes = require("./db.json");
    const notes = await getNotes();
    const note = {
        title,
        id: Date.now().toString(),
    };
    notes.push(note);
    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(chalk.bgGreen("New note added to list"));
}

async function printNotes() {
    const notes = await getNotes();
    console.log(chalk.bgBlueBright(`There we have ${notes.length} notes:`));
    notes.forEach((n) =>
        console.log(chalk.redBright(n.id), chalk.cyan(n.title))
    );
}

async function removeNote(id) {
    const notes = await getNotes();
    const noteIdx = notes.findIndex((n) => n.id == id);

    if (noteIdx < 0) return;

    const [removedNote] = notes.splice(noteIdx, 1);
    await fs.writeFile(notesPath, JSON.stringify(notes));

    console.log(chalk.bgRed(`Note ${removedNote.id} was deleted:`));
    console.log(chalk.red(removedNote.title));
}

module.exports = {
    addNote,
    printNotes,
    removeNote,
    getNotes,
};
