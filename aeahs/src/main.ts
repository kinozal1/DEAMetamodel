import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function start() {
  const PORT = 4001;
  const app = await NestFactory.create(AppModule, {});
  await app.listen(PORT).then(() => {
    console.log(`AEAHS service is running on port ${PORT}`);
  });
}
start();
