
const socket = io();

socket.on("test2", (msg) => {
    console.log("test2", msg);
})


socket.emit("testroom", { roomName: "testRoom" }, "hello");