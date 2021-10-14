import { Controller, Get } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import {
  HealthCheckService,
  MicroserviceHealthIndicator,
  MongooseHealthIndicator,
  HealthCheck,
  HealthCheckResult,
} from '@nestjs/terminus';

@Controller('healthiness')
export class HealthinessController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly microserviceHealthIndicator: MicroserviceHealthIndicator,
    private readonly mongooseHealthIndicator: MongooseHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async checkHealth(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      async () =>
        this.microserviceHealthIndicator.pingCheck('service2-broker', {
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://service-rabbitmq:5672'],
            queue: 'service2',
          },
        }),
      async () =>
        this.mongooseHealthIndicator.pingCheck('service2-database', {
          connection: 'mongodb://service-service2-db:27017/service2',
        }),
    ]);
  }
}
