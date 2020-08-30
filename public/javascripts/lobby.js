

const socket = io();
let __username = "";


window.onload = () => {
    // store username for convieniet access
    __username = document.getElementById("username").getAttribute("value");

    // display available rooms on page load
    searchRooms("");
};

socket.on("message", function (message) {
    console.log("get message", message);
    setCookie(message.roomName, message.roomToken);
    addMessageToWindow(message);
})

socket.on("sendMessage", (message) => {
    console.log("message", message);

})



// // handle response for others joining room
// socket.on("joinRoom", function (msg) {
//     console.log("join mesg", msg);

//     // socket.on("sendMessage", function (msg) {
//     //     console.log("recieved msg", msg);
//     //     //call function to append msg to window
//     // })
// })

// // handle message receive
// socket.on("sendMessage", function (msg) {
//     // if (err) {

//     //     console.log("err", err);
//     //     return
//     // }
//     console.log("received", msg)
//     //add message 
// });

// socket.emit("joinRoom", roomName, username, password, (res) => {

//     //handle join respsone
//     // if (!res) {
//     //     console.log("got join err", err);
//     // }
//     console.log("got join res", res);
//     createRoomTab
// });

//

function findRooms(roomName) {
    console.log("finding", roomName);
    socket.emit("findRooms", roomName, (res) => {



        //create room element from results
        // append to rooms DOM
    });
}


function createRoom(roomName, username, password) {
    socket.emit("createRoom", roomName, username, password, (res) => {

    }
    );


}





function sendMessage(roomName, username, message) {
    console.log("sending mess---------", roomName, username, message);
    const token = getCookie(roomName);
    console.log("send message ", roomName, token, username, message)
    socket.emit("sendMessage", roomName, token, username, message, (message, roomName, roomToken) => {
        console.log("self message ", message)
        addMessageToWindow(message);
        setCookie(roomName, roomToken);


    });


}
/**
 * Socket.io send cookies on handsake so doesn't send updated cookies
 * making cookies receied on cookies server side to be outdated with client and db.
 * Force a reconnect to pass updated cookies to server.
 */
function refreshIO() {
    socket.disconnect();
    socket.connect();
}

/**
 * Get cookie with given name
 * @param {*} roomName 
 */
function getCookie(roomName) {
    var v = document.cookie.match('(^|;) ?' + roomName + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function io_joinRoom(roomName, userName) {
    // socket.emit("joinRoom", roomName, userName, (message) => { addMessageToWindow(message); }, (err) => { });
    // refreshIO();
    const roomCookie = getCookie(roomName);

    socket.emit("joinRoom", roomCookie, roomName, userName, (message, roomName, roomToken) => { addMessageToWindow(message); setCookie(roomName, roomToken); });

}



//create room

//join room

// older function to hide and dsiplay room window
// function openRoom(evt, roomName) {
//     // Declare all variables
//     let i, roomWindow, roomLinks;

//     // Get all elements with class="roomWindow" and hide them
//     roomWindow = document.getElementsByClassName("roomWindow");
//     for (i = 0; i < roomWindow.length; i++) {
//         roomWindow[i].style.display = "none";
//     }

//     // Get all elements with class="tablinks" and remove the class "active"
//     roomLinks = document.getElementsByClassName("roomLinks");
//     for (i = 0; i < roomLinks.length; i++) {
//         roomLinks[i].className = roomLinks[i].className.replace(" active", "");
//     }

//     // Show the current tab, and add an "active" class to the button that opened the tab
//     document.getElementById(roomName).style.display = "block";
//     evt.currentTarget.className += " active";
// }


function addRoom(roomName) {

    setCookie("test2", "22222");
    console.log("cook", document.cookie)
    socket.emit("test", document.cookie);
    // const username = document.getElementById("username").getAttribute("value");

    // console.log("adding room", roomName, username);
    // //create room tab
    // createRoomTab(roomName);
    // //create room div
    // createRoomWindow(roomName);
    // joinRoom(roomName, username, 'abc');
}

function setCookie(name, value) {
    document.cookie = `${name}=${value}`;
}





// http request

function searchRooms(roomName) {
    axios.get("/lobby/rooms", { params: { roomName: roomName, user: 'user' } })
        .then(res => {
            console.log("serac room result", res.data.result);
            listRooms(res.data.result);
        })
        .catch();
}

function joinRoom(roomName, userName, hasPassword) {

    // Prevent joining room again
    if (document.getElementById(roomName + "Window")) {
        return;
    }

    console.log("jr", roomName, userName, hasPassword);
    let pw = "";
    if (hasPassword) {
        //ask for password

    }

    // axios.put("/lobby/room", { userName: 'aaa', roomName: "test1", password: "" })
    axios.put("/lobby/room", { userName: userName, roomName: roomName, password: pw })
        .then(res => {
            console.log("serac room result", res.data, res.data.roomName);
            console.log("serac room result", res.data.roomName);
            //   create room tab
            createRoomWindow(res.data.roomName);
            createRoomTab(res.data.roomName);
            openRoom(roomName);
            console.log("doc cookie", document.cookie);
            io_joinRoom(roomName, userName);
        })
        .catch(err => {
            console.log("err", err)
        });
    //http post username, room name
    //cookie will be set

    console.log("join room", roomName);


}



// Room search results

/**
 * List of rooms from search results
 * @param {[JSON]} rooms 
 */
function listRooms(rooms) {
    //clear rooms of current resutls
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

/**
 * Create a DOM element button for a room.
 * @param {JSON} room 
 */
function createRoomElement(room) {
    const newRoomElement = document.createElement("div");
    const roomName = room.room_name;
    const hasPassword = room.has_password;

    console.log("room name2", roomName, hasPassword)

    // building DOM as string easier to visualise harder to change/maintain
    // newRoomElement.innerHTML =
    //     `
    //         <button id="${roomName}" onclick="joinRoom('${roomName}',username,${hasPassword})">${roomName}</button>
    //     `


    var inputElement = document.createElement('input');
    inputElement.id = roomName + "Result";
    inputElement.type = "button"
    inputElement.value = roomName;
    inputElement.addEventListener('click', function () {
        joinRoom(roomName, __username, hasPassword);
    });

    newRoomElement.appendChild(inputElement);



    return newRoomElement;
}



// Rooms

/**
 * Create tab buttons to select which chat room window to display.
 * @param {*} roomName 
 */
function createRoomTab(roomName) {
    const roomTabs = document.getElementById("roomTabs");
    const newRoom = document.createElement("div");
    const roomNameTab = roomName + "Tab";
    const roomNameWin = roomName + "Window";
    // newRoom.innerHTML = `<button id="${roomNameTab}" class="tablinks" onclick="openRoom(event, '${roomNameWin}')">${roomNameTab}</button>`;
    newRoom.innerHTML = `<button id="${roomNameTab}" class="tablinks" onclick="openRoom('${roomName}')">${roomNameTab}</button>`;
    roomTabs.appendChild(newRoom);

}

/**
 * Create window to display chat messages and text input for room.
 * @param {*} roomName 
 */
function createRoomWindow(roomName) {
    const chatWindows = document.getElementById("chatWindows");
    const newWindow = document.createElement("div");
    const newRoomWindow = roomName + "Window"
    const newRoomMessages = roomName + "Messages";
    console.log("crate window new name", roomName);


    //     newWindow.innerHTML =

    //         `<div id="${newRoomWindow}" class="roomWindow" style="display:none">${roomName}
    //         <div class="top">top

    // <div class="top">
    // <div class="messages">rr</div>
    // <div class="ll">ll</div>
    // </div>
    // </div></div>`
    newWindow.innerHTML =
        `<div id="${newRoomWindow}" class="roomWindow" style="display:none">${roomName}
            <div class="top">
            <div class="roomUsers" id="${roomName + '_users'}">
            Users
            <ul class="usersList" id="${roomName + '_usersList'}">
        </div>
                <div class="messages">messages
                    <ul class="chatMessages" id="${newRoomMessages}"></ul>
                </div>
              
            </div>
            <div class="textBox" id="${roomName + '_textBox'}">
            <form action="javascript:;" onsubmit="sendMessage('${roomName}','${__username}',${roomName + '_input'}.value)">
                <input class="messageInput" type="text" id="${roomName + '_input'}" name="${roomName + '_input'}" autocomplete="off" />
                <input type="submit" value="send"></input>
            </form>
            </div>  

       </div>`;
    chatWindows.appendChild(newWindow);
}
{/* <div class="textBox" id="${roomName + '_textBox'}">
<form action="javascript:;" onsubmit="sendMessage('${roomName}','${__username}',${roomName + '_input'}.value)">
    <input class="messageInput" type="text" id="${roomName + '_input'}" name="${roomName + '_input'}" autocomplete="off" />
    <input type="submit" value="send"></input>
</form>
</div>  */}
/**
 * Display given room window and hide others
 * @param {*} roomName 
 */
function openRoom(roomName) {
    console.log("open room", roomName);


    // Get all elements with class="roomWindow" and hide them
    const roomWindows = document.getElementsByClassName("roomWindow");

    for (let i = 0; i < roomWindows.length; i++) {
        if (roomWindows[i].id == roomName + "Window") {
            // show window id matches
            roomWindows[i].style.display = "block";
        } else {
            // hide window 
            roomWindows[i].style.display = "none";
        }

    }

}

/**
 * Add message to chat window of given room.
 * @param {JSON} message
 */
function addMessageToWindow(message) {
    console.log("new message", message)
    const roomWIndow = document.getElementById(message.roomName + "Window");

    const newMessage = document.createElement("div");

    newMessage.id = message.roomName + ":" + message.sender + ":" + message.time;
    newMessage.textContent = `${message.sender}: ${message.text}`;
    document.getElementById(message.roomName + "Messages").appendChild(newMessage);

}
