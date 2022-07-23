const yargs = require("yargs");
const pkg = require("./package.json");
const { addNote, getNotes } = require("./notes.controller");

yargs.version(pkg.version);

yargs.command({
    command: "add",
    describe: "add new todo",
    builder: {
        title: {
            type: "string",
            describe: "todo content",
            demandOption: true,
        },
    },
    handler({ title }) {
        addNote(title);
    },
});
yargs.command({
    command: "list",
    describe: "list all todo",
    async handler() {
        const notes = await getNotes();
        console.log(notes);
    },
});

yargs.parse();
