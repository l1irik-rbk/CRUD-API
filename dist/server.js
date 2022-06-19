"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const deleteMethod_1 = require("./utils/deleteMethod");
const getMethod_1 = require("./utils/getMethod");
const postMethod_1 = require("./utils/postMethod");
const putMethod_1 = require("./utils/putMethod");
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const server = http_1.default.createServer((req, res) => {
    switch (req.method) {
        case 'GET':
            (0, getMethod_1.getMethod)(req.url, res);
            break;
        case 'POST':
            (0, postMethod_1.postMethod)(req.url, req, res);
            break;
        case 'PUT':
            (0, putMethod_1.putMethod)(req.url, req, res);
            break;
        case 'DELETE':
            (0, deleteMethod_1.deleteMethod)(req.url, req, res);
            break;
        default:
            res.writeHead(404, { ContentType: 'application/json' });
            res.end(JSON.stringify({ message: 'Not a valid Method' }));
            break;
    }
});
server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
