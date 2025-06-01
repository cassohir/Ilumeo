"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consoleTransport = void 0;
const winston_1 = require("winston");
const consoleTransport = new winston_1.transports.Console({
    format: winston_1.format.prettyPrint({
        depth: 5,
        colorize: true,
    }),
});
exports.consoleTransport = consoleTransport;
//# sourceMappingURL=console.transports.logger.js.map