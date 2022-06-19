"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putMethod = void 0;
const usersConroller_1 = require("./../controller/usersConroller");
const getId_1 = require("./getId");
const uuidValidateV4_1 = require("./uuidValidateV4");
const putMethod = (url, req, res) => {
    switch (url) {
        case `${url.match(/^\/api\/users\/[\w-]+$/)}`:
            const id = (0, getId_1.getId)(url);
            const idIsValid = (0, uuidValidateV4_1.uuidValidateV4)(id);
            if (!idIsValid) {
                res.writeHead(400, { ContentType: 'application/json' });
                res.end(JSON.stringify({ message: 'User id is not valid' }));
            }
            (0, usersConroller_1.putUser)(req, res, id);
            break;
        default:
            res.writeHead(404, { ContentType: 'application/json' });
            res.end(JSON.stringify({ message: 'Not Found' }));
            break;
    }
};
exports.putMethod = putMethod;
