import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {IoAdapter} from '@nestjs/platform-socket.io';
import {ServerOptions} from 'socket.io';
import * as https from 'https'
import * as fs from 'fs'
import * as path from 'path'
import {ProductService} from "./product/product.service";
import {Product} from "./product/models/product.model";
import {Sequelize} from "sequelize-typescript";
import {Type} from "./type/type.model";

export class SocketAdapter extends IoAdapter {
    createIOServer(
        port: number,
        options?: ServerOptions & {
            namespace?: string;
            server?: any;
        },
    ) {
        const server = super.createIOServer(port, {...options, cors: true});
        return server;
    }
}


async function bootstrap() {

    const app = await NestFactory.create(AppModule);
    app.useWebSocketAdapter(new SocketAdapter(app));
    app.enableCors()
    const PORT = process.env.APP_PORT || 4000

    await app.listen(PORT, () => { console.log(`port=${PORT}`)});

}

bootstrap();
