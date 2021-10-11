import { Global, Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckController } from './health_check/health-check.controller';
import { HealthCheckModule } from './health_check/health-check.module';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    
    HealthCheckModule,
  ],
  controllers: [AppController, HealthCheckController],
  providers: [AppService],
  exports: [
    
  ],
})
export class AppModule {
  
}
