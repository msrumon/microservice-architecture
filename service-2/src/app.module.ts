import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Service2, Service2Schema } from './schemas/service2.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://service-service-2-db:27017/service2'),
    MongooseModule.forFeature([
      { name: Service2.name, schema: Service2Schema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
