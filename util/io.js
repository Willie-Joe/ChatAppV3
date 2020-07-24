
const cookieParser = require('cookie-parser');
const db = require('../db/dbInterface')

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
            console.log("reload", socket.request.headers.cookie)
                ;
        })
        // join room


        socket.on("joinRoom", function (roomToken, roomName, userName, callback) {


            console.log("room cookies--------------", roomToken);

            console.log("joinin room------------------------------");
            db.authenticateRoomToken(roomToken, roomName, userName).then(result => {


                if (result.success) {
                    const time = new Date();
                    socket.join(roomName, function () {
                        callback({
                            sender: "Admin",
                            roomName: result.roomName,
                            time: time,
                            text: "You have joined the room."
                        },
                            result.roomName,
                            result.roomToken,
                            roomToken);

                        socket.broadcast.to(roomName).emit("message", {
                            sender: "Admin",
                            roomName: result.roomName,
                            text: `${userName} has joined the room.`,
                            time: time
                        });
                    })
                    // If fail emit error back
                }




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
