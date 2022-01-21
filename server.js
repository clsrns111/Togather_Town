import { Server } from "socket.io";
import express from "express";
import { createServer } from "http";
import cors from "cors";

const app = express();
const server = createServer(app);
const socketio = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

socketio.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnd");
  });

  socket.on("callUser", (data) => {
    socketio.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on(
    "answerCall",
    (data) => socketio.to(data.to).emit("callAccepted"),
    data.signal
  );
});

server.listen(5000, () => {
  console.log("server connected");
});
