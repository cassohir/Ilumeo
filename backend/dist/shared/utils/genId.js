"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genId = void 0;
const crypto = require("crypto");
const genId = () => {
    return crypto
        .randomBytes(16)
        .toString('hex')
        .replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
};
exports.genId = genId;
//# sourceMappingURL=genId.js.map