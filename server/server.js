

const users = [];
const messages = [];

const { createServer } = require('http')
const { Server } = require('socket.io')
const httpServer = createServer();



const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
    methods: ["GET", "POST"]
});

const deleteUser = (socketID) => {

    for (var i = 0; i < users.length; i++) {
        if (users[i].id == socketID) {
            users.splice(i, 1);
            break;
        }
    }
    io.emit("update_users", users);
}


io.on("connection", (socket) => {

    console.log("connected " + socket.id)

    socket.on("send_message", (message, username, gender, uid) => {
        messages.push({ body: message, username: username, gender: gender, uid: uid })
        io.emit("update_messages", messages);
    });

    socket.once("get_user_details", (username, gender, uid) => {

        users.push({ id: socket.id, username: username, gender: gender, uid: uid })

        io.emit("update_users", users);
        io.emit("update_messages", messages);
    });



    socket.on('disconnect', () => {
        deleteUser(socket.id);
    });



})



httpServer.listen(3001, () => {
    console.log("server is running");
});