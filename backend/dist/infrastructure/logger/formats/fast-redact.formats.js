"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastRedact = fastRedact;
function fastRedact(obj, options) {
    const { paths, censor = '*[Redacted]*' } = options;
    const redact = (currentObj, pathArray) => {
        if (pathArray.length === 1) {
            const key = pathArray[0];
            if (currentObj.hasOwnProperty(key)) {
                currentObj[key] = censor;
            }
        }
        else {
            const [key, ...rest] = pathArray;
            if (currentObj.hasOwnProperty(key) &&
                typeof currentObj[key] === 'object' &&
                currentObj[key] !== null) {
                redact(currentObj[key], rest);
            }
        }
    };
    const clonedObj = JSON.parse(JSON.stringify(obj));
    for (const path of paths) {
        const pathArray = path.split('.');
        redact(clonedObj, pathArray);
    }
    return JSON.stringify(clonedObj);
}
//# sourceMappingURL=fast-redact.formats.js.map