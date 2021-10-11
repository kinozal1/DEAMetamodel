import { Module } from '@nestjs/common';

import { HealthCheckController } from './health-check.controller';
import { HealthCheckService } from './health-check.service';

@Module({
  providers: [HealthCheckService],
  controllers: [HealthCheckController],
  imports: [],
})
export class HealthCheckModule {}
