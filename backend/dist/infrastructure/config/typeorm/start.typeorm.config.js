"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchema = void 0;
const typeorm_config_1 = require("./typeorm.config");
const createSchema = async () => {
    try {
        await typeorm_config_1.default.initialize();
        const queryRunner = typeorm_config_1.default.createQueryRunner();
        await queryRunner.startTransaction();
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS inside;`);
        await queryRunner.commitTransaction();
        await queryRunner.release();
    }
    catch (error) {
        console.error('Erro ao criar schema "inside":', error);
    }
};
exports.createSchema = createSchema;
(0, exports.createSchema)();
//# sourceMappingURL=start.typeorm.config.js.map