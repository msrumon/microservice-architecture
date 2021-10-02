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
import { Service2 } from './schemas/service2.schema';

@Controller('api/service-2')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getData(): Promise<Service2[]> {
    return await this.appService.fetchData();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async postData(@Body() body: object): Promise<Service2> {
    return await this.appService.storeData(body);
  }

  @Get(':id')
  async getDatum(@Param('id') id: string): Promise<Service2> {
    return await this.appService.fetchDatum(id);
  }

  @Put(':id')
  async putDatum(
    @Param('id') id: string,
    @Body() body: object,
  ): Promise<Service2> {
    return await this.appService.updateDatum(id, body);
  }

  @Delete(':id')
  async deleteDatum(@Param('id') id: string): Promise<Service2> {
    return await this.appService.deleteDatum(id);
  }
}
