// var express = require('express');
const { dbInterface } = require("../db/dbInterface");
const cookie = require("cookie-parser");

const loginCookieOptions = { maxAge: 9000000, path: "/", httpOnly: true };
const roomCookieOptions = { maxAge: 9000000, path: "/", httpOnly: false };

function setLoginCookie(req, res, next) {
    console.log("reqdsfds", res.locals)
    // console.log("fdsffs--------------"),
    //     console("setting cooking", req)
    const token = res.locals.l_token; // //get value from database
    const username = res.locals.username; // //get value from database
    res.cookie("login", token, loginCookieOptions);
    res.cookie("user", username, loginCookieOptions);
    return next();
}

function deleteLoginCookie(req, res, next) {
    res.clearCooke("login", loginCookieOptions);
    next();
}

function setRoomCookie(roomName, roomToken, res) {
    console.log("setting room cookie", roomName, roomToken)
    const token = "token"; // //get value from database
    res.cookie(roomName, roomToken, roomCookieOptions);

}

function deleteRoomCookie(req, res, next) {
    res.clearCooke("login", roomCookieOptions);
    next();
}

module.exports = {
    setLoginCookie,
    deleteLoginCookie,
    setRoomCookie,
    deleteRoomCookie
};
