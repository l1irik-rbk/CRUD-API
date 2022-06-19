"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMethod = void 0;
const usersConroller_1 = require("../controller/usersConroller");
const postMethod = (url, req, res) => {
    switch (url) {
        case '/api/users':
            (0, usersConroller_1.postUser)(req, res);
            break;
        default:
            res.writeHead(404, { ContentType: 'application/json' });
            res.end(JSON.stringify({ message: 'Not Found' }));
            break;
    }
};
exports.postMethod = postMethod;
