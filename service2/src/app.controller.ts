import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getData() {
    return await this.appService.fetchData();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async postData(@Body() body: object) {
    return await this.appService.storeData(body);
  }

  @Get(':id')
  async getDatum(@Param('id') id: string) {
    return await this.appService.fetchDatum(id);
  }

  @Put(':id')
  async putDatum(@Param('id') id: string, @Body() body: object) {
    return await this.appService.updateDatum(id, body);
  }

  @Delete(':id')
  async deleteDatum(@Param('id') id: string) {
    return await this.appService.deleteDatum(id);
  }

  @EventPattern('service1')
  async handleService1(data: Record<string, any>) {
    // do something
    console.log('service1', data);
  }

  @EventPattern('service3')
  async handleService3(data: Record<string, any>) {
    // do something
    console.log('service3', data);
  }
}
