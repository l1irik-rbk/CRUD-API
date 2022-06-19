"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = exports.updateUser = exports.createUser = exports.findUser = exports.findAllUsers = void 0;
const uuid_1 = require("uuid");
let users = require('../../data/data.json');
const findAllUsers = () => {
    return new Promise((resolve, reject) => {
        resolve(users);
    });
};
exports.findAllUsers = findAllUsers;
const findUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id);
        resolve(user);
    });
};
exports.findUser = findUser;
const createUser = (user) => {
    return new Promise((resolve, reject) => {
        const newUser = Object.assign({ id: (0, uuid_1.v4)() }, user);
        users.push(newUser);
        resolve(newUser);
    });
};
exports.createUser = createUser;
const updateUser = (id, user) => {
    return new Promise((resolve, reject) => {
        const userIndex = users.findIndex((user) => user.id === id);
        users[userIndex] = Object.assign({ id }, user);
        resolve(users[userIndex]);
    });
};
exports.updateUser = updateUser;
const removeUser = (id) => {
    return new Promise((resolve, reject) => {
        users = users.filter((user) => user.id !== id);
        resolve();
    });
};
exports.removeUser = removeUser;
