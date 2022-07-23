const chalk = require("chalk");
const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const { addNote } = require("./notes.controller");

const PORT = 3000;

const pagesPath = path.resolve(__dirname, "pages");

const server = http.createServer(async (req, res) => {
    if (req.method === "GET") {
        const content = await fs.readFile(
            path.resolve(pagesPath, "index.html")
        );
        res.writeHead(200, {
            "Content-Type": "text/html",
        });
        res.end(content);
    } else if (req.method === "POST") {
        const body = [];

        res.writeHead(200, "Content-Type: text/plain; charset: utf-8");

        req.on("data", (data) => {
            body.push(Buffer.from(data));
        });

        req.on("end", async () => {
            const title = body.toString().split("=")[1].replace(/\+/g, " ");
            await addNote(title);

            res.end(`success ${title}`);
        });
    }
});

server.listen(PORT, () => {
    console.log(chalk.bgGreen(`server listening on port ${PORT}`));
});
