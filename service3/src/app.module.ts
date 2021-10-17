import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthinessModule } from './healthiness/healthiness.module';
import { Service3, Service3Schema } from './schemas/service3.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: Service3.name, schema: Service3Schema },
    ]),
    ClientsModule.register([
      {
        name: 'SERVICE3',
        transport: Transport.RMQ,
        options: { urls: [process.env.RABBITMQ_URI], queue: 'service3' },
      },
    ]),
    HealthinessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
