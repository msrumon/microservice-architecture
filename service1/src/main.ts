import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.RMQ,
      options: { urls: [process.env.RABBITMQ_URI], queue: 'service1' },
    },
    { inheritAppConfig: true },
  );
  app.setGlobalPrefix('service1');

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
