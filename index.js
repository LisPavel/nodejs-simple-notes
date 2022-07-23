const yargs = require("yargs");
const pkg = require("./package.json");
const { addNote, printNotes, removeNote } = require("./notes.controller");

yargs.version(pkg.version);

yargs.command({
    command: "add",
    describe: "add new note",
    builder: {
        title: {
            type: "string",
            describe: "note content",
            demandOption: true,
        },
    },
    handler({ title }) {
        addNote(title);
    },
});
yargs.command({
    command: "list",
    describe: "list all notes",
    async handler() {
        await printNotes();
    },
});
yargs.command({
    command: "remove",
    describe: "remove note by id",
    builder: {
        id: {
            type: "id",
            describe: "note id",
            demandOption: true,
        },
    },
    async handler({ id }) {
        await removeNote(id);
    },
});

yargs.parse();
