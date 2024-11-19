const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public")); // Sirve archivos en la carpeta "public"

const PORT = 3000;

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("updateCursor", (data) => {
        // Reenvía las coordenadas y el nombre a todos los usuarios excepto al emisor
        socket.broadcast.emit("updateCursor", data);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
