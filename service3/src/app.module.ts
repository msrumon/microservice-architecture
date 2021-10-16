import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Service3, Service3Schema } from './schemas/service3.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: Service3.name, schema: Service3Schema },
    ]),
    TerminusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
