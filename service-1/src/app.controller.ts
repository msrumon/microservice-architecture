import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Service1 } from './schemas/service1.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getData(): Promise<Service1[]> {
    return await this.appService.fetchData();
  }

  @Post()
  async postData(@Body() body: object): Promise<Service1> {
    return await this.appService.storeData(body);
  }

  @Get()
  async getDatum(@Param('id') id: string): Promise<Service1> {
    return await this.appService.fetchDatum(id);
  }

  @Put()
  async putDatum(
    @Param('id') id: string,
    @Body() body: object,
  ): Promise<Service1> {
    return await this.appService.updateDatum(id, body);
  }

  @Delete()
  async deleteDatum(@Param('id') id: string): Promise<Service1> {
    return await this.appService.deleteDatum(id);
  }
}
