const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log("A user connected");

    // Receive location from client
    socket.on('send-location', (data) => {
        io.emit('receive-location', { id: socket.id, ...data });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        io.emit('user-disconnected', socket.id);
        console.log("A user disconnected");
    });
});

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));