"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullKeyPaths = getFullKeyPaths;
function getFullKeyPaths(obj, key) {
    const paths = [];
    function traverse(currentObj, currentPath) {
        if (currentObj &&
            typeof currentObj === 'object' &&
            !Array.isArray(currentObj)) {
            for (const [prop, value] of Object.entries(currentObj)) {
                const newPath = currentPath ? `${currentPath}.${prop}` : prop;
                if (prop === key) {
                    paths.push(newPath);
                }
                traverse(value, newPath);
            }
        }
    }
    traverse(obj, '');
    return paths;
}
//# sourceMappingURL=object.js.map