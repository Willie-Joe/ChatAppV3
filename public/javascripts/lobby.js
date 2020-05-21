
const socket = io();

socket.on("test2", (msg) => {
    console.log("test2", msg);
})


socket.emit("testroom", { roomName: "testRoom" }, "hello");



//create room

//join room

//leave room
function openRoom(evt, roomName) {
    // Declare all variables
    let i, tabcontent, roomLinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    roomLinks = document.getElementsByClassName("roomLinks");
    for (i = 0; i < roomLinks.length; i++) {
        roomLinks[i].className = roomLinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(roomName).style.display = "block";
    evt.currentTarget.className += " active";
}


function addRoom(roomName) {
    //create room tab
    createRoomTab(roomName);
    //create room div
    createRoomWindow(roomName);
}


function createRoomTab(roomName) {
    const roomTabs = document.getElementById("roomTabs");
    const newRoom = document.createElement("div");
    newRoom.innerHTML = `<button class="tablinks" onclick="openRoom(event, '${roomName}')">${roomName}</button>`;
    roomTabs.appendChild(newRoom);

}

function createRoomWindow(roomName) {
    const chatWindows = document.getElementById("chatWindows");
    const newWindow = document.createElement("div");
    newWindow.innerHTML =
        `<div id="${roomName}" class="tabcontent" style="display:none">
        <ul id="messages"></ul>
        <form action="">
            <input id="m" autocomplete="off" /><button>Send</button>
        </form>
    </div>`;
    chatWindows.appendChild(newWindow);
}
