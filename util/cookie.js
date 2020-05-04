// var express = require('express');

const cookieOptions = { maxAge: 9000000, path: "/", httpOnly: false }

function setLoginCookie(req, res, next) {

    const token = "token"; // //get value from database
    res.cookie("login", "value", cookieOptions);
    next();
}

function deleteLoginCookie(req, res, next) {
    res.clearCooke("login", cookieOptions);
    next();
}

function setRoomCookie(req, res, next) {

    const token = "token"; // //get value from database
    res.cookie("login", "value", cookieOptions);
    next();
}

function deleteRoomCookie(req, res, next) {
    res.clearCooke("login", cookieOptions);
    next();
}

module.exports = {
    setLoginCookie,
    deleteLoginCookie,
    setRoomCookie,
    deleteRoomCookie
};
