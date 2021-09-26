import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.NATS,
      options: { servers: 'nats://nats-service.default:4222', queue: 'service-2' },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();
  await app.listen(5555);
}
bootstrap();
