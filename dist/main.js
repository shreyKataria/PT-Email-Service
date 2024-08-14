"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
// import { ValidationPipe } from "@nestjs/common";
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    //   app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
