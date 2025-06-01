"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const fast_redact_formats_1 = require("./fast-redact.formats");
const object_1 = require("../../../shared/utils/object");
const redactSensitiveKeys = (0, winston_1.format)((info, opts) => {
    if (!opts ||
        typeof opts !== 'object' ||
        !Array.isArray(opts.redactKeys)) {
        throw new Error('Invalid options provided to redactSensitiveKeys.');
    }
    const options = opts;
    const fullKeyPaths = options.redactKeys.flatMap((key) => (0, object_1.getFullKeyPaths)(info, key));
    if (fullKeyPaths.length === 0) {
        return info;
    }
    const redacted = (0, fast_redact_formats_1.fastRedact)(info, {
        censor: options.redactLabel || '*[Redacted]*',
        paths: fullKeyPaths,
    });
    const redactedInfo = JSON.parse(redacted);
    return Object.assign(info, redactedInfo);
});
exports.default = redactSensitiveKeys;
//# sourceMappingURL=redact-sensitive-keys.formats.logger.js.map