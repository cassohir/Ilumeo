"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_config_1 = require("./infrastructure/config/environment/swagger.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle(swagger_config_1.DOCUMENT_TITLE)
        .setDescription(swagger_config_1.DOCUMENT_DESCRIPTION)
        .setVersion(swagger_config_1.VERSION)
        .addBearerAuth()
        .build();
    app.useGlobalFilters();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup(swagger_config_1.PATH, app, document);
    await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
//# sourceMappingURL=main.js.map