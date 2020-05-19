// var express = require('express');
const { dbInterface } = require("../db/dbInterface");

const loginCookieOptions = { maxAge: 9000000, path: "/", httpOnly: true };
const roomCookieOptions = { maxAge: 9000000, path: "/room", httpOnly: true };

function setLoginCookie(req, res, next) {
    console.log("reqdsfds", req.locals)
    // console.log("fdsffs--------------"),
    //     console("setting cooking", req)
    const token = req.locals.l_token; // //get value from database
    res.cookie("login", token, loginCookieOptions);
    return next();
}

function deleteLoginCookie(req, res, next) {
    res.clearCooke("login", loginCookieOptions);
    next();
}

function setRoomCookie(req, res, next) {

    const token = "token"; // //get value from database
    res.cookie("login", "value", roomCookieOptions);
    next();
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
