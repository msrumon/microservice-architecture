import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthinessModule } from './healthiness/healthiness.module';
import { Service1, Service1Schema } from './schemas/service1.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: Service1.name, schema: Service1Schema },
    ]),
    ClientsModule.register([
      {
        name: 'SERVICE1',
        transport: Transport.RMQ,
        options: { urls: [process.env.RABBITMQ_URI], queue: 'service1' },
      },
    ]),
    HealthinessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
