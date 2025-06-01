"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeStringToBase64 = void 0;
const node_buffer_1 = require("node:buffer");
const encodeStringToBase64 = (str) => {
    const buffer = node_buffer_1.Buffer.from(str, 'utf-8');
    return buffer.toString('base64');
};
exports.encodeStringToBase64 = encodeStringToBase64;
//# sourceMappingURL=encode64.js.map