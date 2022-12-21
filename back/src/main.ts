import {NestFactory} from '@nestjs/core';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {PrismaService} from "./core/prisma.service";

import {AppModule} from './app.module';

async function bootstrap() {
    const PORT = process.env.PORT || 8080
    const app = await NestFactory.create(AppModule);
    app.enableCors({

        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204,
        credentials: true,
    });
    app.useGlobalPipes(new ValidationPipe());
    // const reflector = new Reflector();
    // app.useGlobalGuards(new AccessTokenGuard(reflector));
    const config = new DocumentBuilder()
        .setTitle('Firefighter NestJs API')
        .setDescription('API Портала пожежної служби')
        .setVersion('1.0')
        .addTag('Firefighter')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app)

    await app.listen(PORT, () => console.log(`Server started on port : ${PORT}`));

}

bootstrap();
