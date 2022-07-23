const chalk = require("chalk");
const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    res.end("Hello from server");
});

server.listen(PORT, () => {
    console.log(chalk.bgGreen(`server listening on port ${PORT}`));
});
