
const socket = io();

socket.on("test2", (msg) => {
    console.log("test2", msg);
})




// handle response for others joining room
socket.on("joinRoom", function (msg) {
    console.log("join mesg", msg);

    // socket.on("sendMessage", function (msg) {
    //     console.log("recieved msg", msg);
    //     //call function to append msg to window
    // })
})

// handle message receive
socket.on("sendMessage", function (msg) {
    // if (err) {

    //     console.log("err", err);
    //     return
    // }
    console.log("received", msg)
    //add message 
});


function joinRoom(roomName, username, password) {
    //http post username, room name
    //cookie will be set

    console.log("join room", roomName);

    socket.emit("joinRoom", roomName, username, password, (res) => {
        //handle join respsone
        // if (!res) {
        //     console.log("got join err", err);
        // }
        console.log("got join res", res);
    });
}

function sendMessage(roomName, username, message) {
    console.log("sending mess", roomName, username, message);
    socket.emit("sendMessage", roomName, username, message, (mes) => { console.log("fffff", mes); });


}

holdOn(10000);
joinRoom("testname", "bob");
console.log("fdsfdsf");
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
    console.log("adding room", roomName)
    //create room tab
    createRoomTab(roomName);
    //create room div
    createRoomWindow(roomName);
    joinRoom(roomName, 'fbob', 'abc');
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
    console.log("crate window new name", roomName);
    newWindow.innerHTML =
        `<div id="${roomName}" class="tabcontent" style="display:none">${roomName}
        <ul id="messages"></ul>
        <form action="javascript:;" onsubmit="sendMessage('${roomName}','bbb',${roomName + '_input'}.value)">
            <input type="text" id="m" name="${roomName + '_input'}" autocomplete="off" />
            <input type="submit" value="send"></input>
        </form>
    </div>`;
    chatWindows.appendChild(newWindow);
}

