"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = exports.config = exports.databaseSchema = void 0;
exports.databaseSchema = {
    DATABASE_NAME: 'POSTGRES_DB',
    DATABASE_HOST: 'POSTGRES_HOST',
    DATABASE_PORT: 'POSTGRES_PORT',
    DATABASE_USER: 'POSTGRES_USERNAME',
    DATABASE_PASSWORD: 'POSTGRES_PASSWORD',
};
exports.config = {
    APP_SECRET: 'APP_SECRET',
    EXPIRATION_TIME: 'EXPIRATION_TIME',
};
exports.cache = {
    HOST: 'REDIS_HOST',
    PORT: 'REDIS_PORT',
    PASSWORD: 'REDIS_PASSWORD',
    USER_NAME: 'REDIS_USERNAME',
    REDIS_URL: 'REDIS_URL',
};
//# sourceMappingURL=schemas.config.js.map