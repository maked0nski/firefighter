import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {NestFactory, Reflector} from '@nestjs/core';
import {ValidationPipe} from "@nestjs/common";

import {PrismaService} from "./__core/prisma.service";
import {AccessTokenGuard} from "./__core/guards";
import {AppModule} from './app.module';
import {configs} from './__configs';

const configureCors = {
    "origin": "*",
    "methods": "GET,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    credentials: true,
}

// SwaggerConfig
const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Firefighter NestJs API')
    .setDescription('API Портала пожежної служби')
    .setVersion('1.0')
    .addTag('Firefighter')
    .build();

async function bootstrap() {
    const PORT = configs.PORT
    const app = await NestFactory.create(AppModule);
    app.enableCors(configureCors);

    app.useGlobalPipes(new ValidationPipe());
    // ??
    const reflector = new Reflector();
    app.useGlobalGuards(new AccessTokenGuard(reflector));

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app)

    await app.listen(PORT, () => console.log(`Server started on port : ${PORT}`));

}

bootstrap();
