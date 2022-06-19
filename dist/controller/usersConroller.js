"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const userModel_1 = require("./../models/userModel");
const userModel_2 = require("../models/userModel");
const getUsers = (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = (yield (0, userModel_2.findAllUsers)());
        res.writeHead(200, { ContentType: 'application/json' });
        res.end(JSON.stringify(users));
    }
    catch (error) {
        res.writeHead(500, { ContentType: 'application/json' });
        res.end(JSON.stringify({ message: 'bad request' }));
    }
});
exports.getUsers = getUsers;
const getUser = (res, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = (yield (0, userModel_2.findUser)(id));
        if (!user) {
            res.writeHead(404, { ContentType: 'application/json' });
            res.end(JSON.stringify({ message: 'Not Found' }));
        }
        else {
            res.writeHead(200, { ContentType: 'application/json' });
            res.end(JSON.stringify(user));
        }
    }
    catch (error) {
        res.writeHead(500, { ContentType: 'application/json' });
        res.end(JSON.stringify({ message: 'bad request' }));
    }
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
            const { username, age, hobbies } = JSON.parse(body);
            if (!username || !age || !hobbies) {
                res.writeHead(400, { ContentType: 'application/json' });
                res.end(JSON.stringify({ message: 'Body does not contain required fields' }));
                return;
            }
            const user = {
                username,
                age,
                hobbies,
            };
            const newUser = yield (0, userModel_2.createUser)(user);
            res.writeHead(201, { ContentType: 'application/json' });
            res.end(JSON.stringify(newUser));
        }));
    }
    catch (error) {
        res.writeHead(500, { ContentType: 'application/json' });
        res.end(JSON.stringify({ message: 'bad request' }));
    }
});
exports.postUser = postUser;
const putUser = (req, res, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = (yield (0, userModel_2.findUser)(id));
        if (!user) {
            res.writeHead(404, { ContentType: 'application/json' });
            res.end(JSON.stringify({ message: 'Not Found' }));
        }
        else {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
                const { username, age, hobbies } = JSON.parse(body);
                const updatedUser = {
                    username: username || user.username,
                    age: age || user.age,
                    hobbies: hobbies || user.hobbies,
                };
                const updUser = yield (0, userModel_1.updateUser)(id, updatedUser);
                res.writeHead(200, { ContentType: 'application/json' });
                res.end(JSON.stringify(updUser));
            }));
        }
    }
    catch (error) {
        res.writeHead(500, { ContentType: 'application/json' });
        res.end(JSON.stringify({ message: 'bad request' }));
    }
});
exports.putUser = putUser;
const deleteUser = (res, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = (yield (0, userModel_2.findUser)(id));
        if (!user) {
            res.writeHead(404, { ContentType: 'application/json' });
            res.end(JSON.stringify({ message: 'Not Found' }));
        }
        else {
            yield (0, userModel_1.removeUser)(id);
            res.writeHead(204, { ContentType: 'application/json' });
            res.end(JSON.stringify({ message: 'The record is found and deleted' }));
        }
    }
    catch (error) {
        res.writeHead(500, { ContentType: 'application/json' });
        res.end(JSON.stringify({ message: 'bad request' }));
    }
});
exports.deleteUser = deleteUser;
