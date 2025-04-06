const fs = require("node:fs");
const http = require("node:http");

const index = fs.readFileSync("./index.html", "utf8");

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end(index);
});

server.listen(8000, () => {
  console.log("Server started on port 8080");
});
