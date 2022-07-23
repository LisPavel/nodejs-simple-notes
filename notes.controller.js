const fs = require("fs/promises");
const path = require("path");
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
}

module.exports = {
    addNote,
    getNotes,
};
