import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
const app = express();
const server = createServer(app);
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
  },
});
io.on("connection", (socket) => {
  // console.log("user connected");
  // console.log("id ", socket.id);
  socket.on("message", (e) => {
    socket.broadcast.emit("input-message", "Welcome to wesite !" + e);
  });
  // socket.on("disconnect", () => {
  //   console.log("disconnected", socket.id);
  // });
});
app.get("/", (req, res) => {
  res.send("hello world");
});
const port = 3000;
server.listen(port, () => {
  console.log("app is lisning on port " + port);
});
