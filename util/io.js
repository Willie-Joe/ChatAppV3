
const cookieParser = require('cookie-parser');

module.exports = function (io) {

    io.use(function (socket, next) {
        console.log("io middle ware");
        // socket
        next();
    });



    io.on("connection", socket => {
        const user = socket.request.headers.cookie;

        // join room
        socket.on("joinRoom", function (roomName, password, username, callback) {
            console.log("joinin room------------------------------");
            //authenticate
            // If fail emit error back
            callback(roomName);
            socket.join(roomName, function () {


                socket.broadcast.to(roomName).emit("joinRoom", {
                    room: roomName,
                    text: `$(username) has joined the room.`
                });
                const res = { room: roomName, text: `You have joined ${roomName}.` };
                const err = '';

            });





        });

        socket.on("sendMessage", function (roomName, username, message, callback) {
            console.log("got message", roomName, username, message);
            callback("callbackmessage" + message);
            const err = '';
            io.to(roomName)
                .emit("sendMessage",
                    {
                        roomname: roomName,
                        username: username,
                        message: message
                    }
                );

        })
        // console.log(socket);

        //nsp.namespace.name
        // create room
        // join room
        //

        socket.on("testroom", (params, msg) => {
            console.log(params, msg)
        });
        // console.log("got test2", socket.events());
        socket.emit("test2");

        socket.on("disconnect", () => {
            console.log("disconnected");
        });







    });
}
