import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.RMQ,
      options: { urls: [process.env.RABBITMQ_URI], queue: 'service2' },
    },
    { inheritAppConfig: true },
  );
  app.setGlobalPrefix('api/service2');

  await app.startAllMicroservices();
  await app.listen(3002);
}
bootstrap();
