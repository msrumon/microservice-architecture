import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthinessModule } from './healthiness/healthiness.module';
import { Service2, Service2Schema } from './schemas/service2.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: Service2.name, schema: Service2Schema },
    ]),
    ClientsModule.register([
      {
        name: 'SERVICE2',
        transport: Transport.RMQ,
        options: { urls: [process.env.RABBITMQ_URI], queue: 'service2' },
      },
    ]),
    HealthinessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
