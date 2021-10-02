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

@Controller('api/service-3')
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

  @Get(':id')
  async getDatum(@Param('id') id: string): Promise<Service3> {
    return this.appService.fetchDatum(id);
  }

  @Put(':id')
  async putDatum(
    @Param('id') id: string,
    @Body() body: object,
  ): Promise<Service3> {
    return this.appService.updateDatum(id, body);
  }

  @Delete(':id')
  async deleteDatum(@Param('id') id: string): Promise<Service3> {
    return this.appService.deleteDatum(id);
  }
}
