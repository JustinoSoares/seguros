import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Handler } from 'express';
import { Server } from 'http';

let server: Server;

/*async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();*/

export const handler: Handler = async (req, res) => {
  if (!server) {
    const app = await NestFactory.create(AppModule);
    await app.init();
    server = app.getHttpAdapter().getInstance();
  }
  server(req, res);
};

