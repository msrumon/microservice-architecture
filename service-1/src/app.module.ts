import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Service1, Service1Schema } from './schemas/service1.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://service-service-1-db/service1'),
    MongooseModule.forFeature([
      { name: Service1.name, schema: Service1Schema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
