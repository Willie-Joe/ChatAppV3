
const cookieParser = require('cookie-parser');

module.exports = function (io) {

    io.use(function (socket, next) {
        console.log("io middle ware");
        // socket
        next();
    });



    io.on("connection", socket => {
        const user = socket.request.headers.cookie


        // console.log(socket);

        //nsp.namespace.name
        // create room
        // join room
        //

        socket.on("testroom", (params, msg) => {
            console.log(params, msg)
        })
        // console.log("got test2", socket.events());
        socket.emit("test2");

        socket.on("disconnect", () => {
            console.log("disconnected");
        })







    });
}
