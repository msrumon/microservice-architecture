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
import { Transport } from '@nestjs/microservices';
import {
  HealthCheckService,
  MicroserviceHealthIndicator,
  MongooseHealthIndicator,
  HealthCheck,
  HealthCheckResult,
} from '@nestjs/terminus';
import { AppService } from './app.service';
import { Service2 } from './schemas/service2.schema';

@Controller()
export class AppController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly microserviceHealthIndicator: MicroserviceHealthIndicator,
    private readonly mongooseHealthIndicator: MongooseHealthIndicator,
    private readonly appService: AppService,
  ) {}

  @Get('healthiness')
  @HealthCheck()
  async checkHealth(): Promise<HealthCheckResult> {
    return await this.healthCheckService.check([
      async () =>
        this.microserviceHealthIndicator.pingCheck('broker', {
          transport: Transport.RMQ,
          options: { urls: [process.env.RABBITMQ_URI], queue: 'service1' },
        }),
      async () => this.mongooseHealthIndicator.pingCheck('database'),
    ]);
  }

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
