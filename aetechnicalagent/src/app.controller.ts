import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  MessageTypes,
  MicroserviceApiInterface,
  ServiceStateTypes,
  ServiceStatus,
  ServiceTypeTypes,
} from '../../sharedresources/general_resources/build/main';

@Controller()
export class AppController implements MicroserviceApiInterface {
  constructor(private readonly appService: AppService) {}
  @Get(`${MessageTypes.GetStatus}`)
  GetSatus() {
    return {
      name: `${ServiceTypeTypes.AETechnicalAgent}`,
      available: true,
      state: ServiceStateTypes.Normal,
    } as ServiceStatus;
  }
  GetConfig<T>(config: T) {}

  IntroduceAvailableData() {
    return;
  }
  @Post(`${MessageTypes.AvailableData}`)
  GetData(@Body() payload: any) {
    this.appService.addField(payload);
  }
  @Get(`${MessageTypes.ReqiredData}`)
  SendData() {
    return this.appService.getAll();
  }
}
