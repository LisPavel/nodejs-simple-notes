const chalk = require("chalk");
const http = require("http");
const fs = require("fs/promises");
const path = require("path");

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
    }
});

server.listen(PORT, () => {
    console.log(chalk.bgGreen(`server listening on port ${PORT}`));
});
