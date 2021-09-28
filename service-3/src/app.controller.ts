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
import { AppService } from './app.service';
import { Service3 } from './schemas/service3.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getData(): Promise<Service3[]> {
    return this.appService.fetchData();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async postData(@Body() body: object): Promise<Service3> {
    return this.appService.storeData(body);
  }

  @Get()
  async getDatum(@Param('id') id: string): Promise<Service3> {
    return this.appService.fetchDatum(id);
  }

  @Put()
  async putDatum(
    @Param('id') id: string,
    @Body() body: object,
  ): Promise<Service3> {
    return this.appService.updateDatum(id, body);
  }

  @Delete()
  async deleteDatum(@Param('id') id: string): Promise<Service3> {
    return this.appService.deleteDatum(id);
  }
}
