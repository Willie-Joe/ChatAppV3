
const cookieParser = require('cookie-parser');

module.exports = function (io) {

    io.use(function (socket, next) {
        console.log("io middle ware");
        // socket
        next();
    });



    io.on("connection", socket => {
        // console.log("login cookies--------------", socket.request.headers.cookie);
        const user = socket.request.headers.cookie;


        socket.on("reload", function () {
            console.log("reload")
                ;
        })
        // join room
        socket.on("joinRoom", function (roomName, username, callback) {


            console.log("room cookies--------------", socket.request.headers.cookie);

            console.log("joinin room------------------------------");
            //authenticate
            // If fail emit error back

            const time = new Date();
            socket.join(roomName, function () {
                callback({
                    sender: "Admin",
                    roomName: roomName,
                    time: time,
                    text: "You have joined the room."
                });

                socket.broadcast.to(roomName).emit("message", {
                    sender: "Admin",
                    roomName: roomName,
                    text: `${username} has joined the room.`,
                    time: time
                });

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
