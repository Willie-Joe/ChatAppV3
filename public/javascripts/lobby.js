

const socket = io();
let username = "";
window.onload = () => {
    username = document.getElementById("username").getAttribute("value");

    searchRooms("");
};

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



function findRooms(roomName) {
    console.log("finding", roomName);
    socket.emit("findRooms", roomName, (res) => {



        //create room element from results
        // append to rooms DOM
    })
}
socket.emit("joinRoom", roomName, username, password, (res) => {

    //handle join respsone
    // if (!res) {
    //     console.log("got join err", err);
    // }
    console.log("got join res", res);
    createRoomTab
});









function createRoom(roomName, username, password) {
    socket.emit("createRoom", roomName, username, password, (res) => {

    }
    );


}





function sendMessage(roomName, username, message) {
    console.log("sending mess", roomName, username, message);
    socket.emit("sendMessage", roomName, username, message, (mes) => { console.log("fffff", mes); });


}



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

    // const username = document.getElementById("username").getAttribute("value");

    console.log("adding room", roomName, username);
    //create room tab
    createRoomTab(roomName);
    //create room div
    createRoomWindow(roomName);
    joinRoom(roomName, username, 'abc');
}




// room chat window
function createRoomTab(roomName) {
    const roomTabs = document.getElementById("roomTabs");
    const newRoom = document.createElement("div");
    const roomNameTab = roomName + "Tab";
    const roomNameWin = roomName + "Window";
    newRoom.innerHTML = `<button id="${roomNameTab}" class="tablinks" onclick="openRoom(event, '${roomNameWin}')">${roomNameTab}</button>`;
    roomTabs.appendChild(newRoom);

}

function createRoomWindow(roomName) {
    const chatWindows = document.getElementById("chatWindows");
    const newWindow = document.createElement("div");
    const newRoomWindow = roomName + "Window"
    console.log("crate window new name", roomName);
    newWindow.innerHTML =
        `<div id="${newRoomWindow}" class="tabcontent" style="display:none">${roomName}
        <ul id="messages"></ul>
        <form action="javascript:;" onsubmit="sendMessage('${roomName}','bbb',${roomName + '_input'}.value)">
            <input type="text" id="m" name="${roomName + '_input'}" autocomplete="off" />
            <input type="submit" value="send"></input>
        </form>
    </div>`;
    chatWindows.appendChild(newWindow);
}


function sendMessage(room, message) {
    console.log(room, message);
}



function searchRooms(roomName) {
    axios.get("/lobby/rooms", { params: { roomName: roomName, user: 'user' } })
        .then(res => {
            console.log("serac room result", res.data.result);
            listRooms(res.data.result);
        })
        .catch();
}

function joinRoom(roomName, userName, hasPassword, password = "") {

    let pw = "";
    if (hasPassword) {
        pw = password;
    }
    axios.put("/lobby/room", { userName: 'aaa', roomName: "test1", password: "" })
        // axios.put("/lobby/join", { params: { userName: 'aaa', roomName: roomName, password: pw } })
        .then(res => {
            console.log("serac room result", res.data, res.data.roomName);
            console.log("serac room result", res.data.roomName);
            //   create room tab
        })
        .catch(err => {
            console.log("err", err)
        });
    //http post username, room name
    //cookie will be set

    console.log("join room", roomName);
}



function listRooms(rooms) {
    //clear list of current list
    const roomList = document.getElementById("roomList");
    while (roomList.firstChild) {
        roomList.removeChild(roomList.lastChild);
    }


    // append new rooms to list
    rooms.forEach(room => {
        console.log("rooms", room)
        //append room element to room list
        const roomElement = createRoomElement(room);

        roomList.appendChild(roomElement);






    });
}

// room search results
function createRoomElement(room) {
    const newRoomElement = document.createElement("div");
    const roomName = room.room_name;
    const hasPassword = room.has_Password;

    newRoomElement.innerHTML =
        `
            <div>
                <button id="${roomName}" onclick=joinRoom(${roomName},username,${hasPassword})>${roomName}</button>
            </div>
        `


    return newRoomElement;
}
