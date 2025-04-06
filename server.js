import * as fs from "node:fs";
import * as http from "node:http";
import { WebSocketServer } from "ws";

const index = fs.readFileSync("./index.html", "utf8");
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end(index);
});
const PORT = 8000;

const ws = new WebSocketServer({ server });

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

ws.on("connection", (connection, req) => {
  const ip = req.socket.remoteAddress;
  console.log(`Connected to ${ip}`);
  connection.on("message", (message) => {
    console.log("Received:", message);
    for (const client of ws.clients) {
      if (client.readyState !== WebSocket.OPEN) continue;
      if (client === connection) continue;
      client.send(message, { binary: false });
    }
  });
  connection.on("close", () => {
    console.log(`Disconnected from ${ip}`);
  });
});
