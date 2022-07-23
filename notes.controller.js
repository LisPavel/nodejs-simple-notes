const fs = require("fs/promises");
// const notes = [];

function getNotes() {
    return require("./db.json");
}

async function addNote(title) {
    const notes = require("./db.json");
    const note = {
        title,
        id: Date.now().toString(),
    };
    notes.push(note);
    await fs.writeFile("./db.json", JSON.stringify(notes));
}

module.exports = {
    addNote,
    getNotes,
};
