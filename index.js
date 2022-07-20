const yargs = require("yargs");
const pkg = require("./package.json");

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
        console.log("add new todo:", title);
    },
});
yargs.command({
    command: "list",
    describe: "list all todo",
    handler() {
        console.log("list all todo");
    },
});

yargs.parse();
