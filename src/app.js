
const express = require("express");
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const routes = require("./Routes/routes");
const server = http.createServer(app);

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10));
    }, 1000);
});

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')))

app.use("", routes);

server.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
})

module.exports = app;
