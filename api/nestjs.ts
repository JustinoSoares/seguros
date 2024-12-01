import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module'; // Altere para o caminho correto do seu módulo
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors(); // Se necessário
  await app.init();
}

// Inicia o app, mas apenas quando o arquivo for executado como função serverles
  bootstrap(); // Inicializa o NestJS

export default server; // Exporta o servidor para o Vercel
