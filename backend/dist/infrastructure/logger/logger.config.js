"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const console_transports_logger_1 = require("./transports/console.transports.logger");
const redact_sensitive_keys_formats_logger_1 = require("./formats/redact-sensitive-keys.formats.logger");
const transports = [console_transports_logger_1.consoleTransport];
const logger = (0, winston_1.createLogger)({
    format: winston_1.format.combine((0, redact_sensitive_keys_formats_logger_1.default)({
        redactKeys: [
            'token',
            'password',
            'authorization',
            'passwordConfirmation',
        ],
    }), winston_1.format.metadata(), winston_1.format.timestamp()),
    exitOnError: false,
    transports,
});
exports.default = logger;
//# sourceMappingURL=logger.config.js.map