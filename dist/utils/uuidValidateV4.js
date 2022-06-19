"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuidValidateV4 = void 0;
const uuid_1 = require("uuid");
const uuid_2 = require("uuid");
const uuidValidateV4 = (uuid) => {
    return (0, uuid_2.validate)(uuid) && (0, uuid_1.version)(uuid) === 4;
};
exports.uuidValidateV4 = uuidValidateV4;
