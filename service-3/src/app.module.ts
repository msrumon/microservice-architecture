import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Service3, Service3Schema } from './schemas/service3.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://service-service-3-db:27017/service3'),
    MongooseModule.forFeature([
      { name: Service3.name, schema: Service3Schema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
