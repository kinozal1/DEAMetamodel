import { Controller, Get, Post } from '@nestjs/common';
import { of } from 'rxjs';
import {
  AEERPDto,
  AEERPInConfig,
  AEERPOutConfig,
  MessageTypes,
  MicroserviceApiInterface,
  ServiceStateTypes,
  ServiceStatus,
  ServiceTypeTypes,
} from '../../sharedresources/general_resources/build/main';
import { AppService } from './app.service';

@Controller()
export class AppController implements MicroserviceApiInterface {
  constructor(private readonly appService: AppService) {}
  @Get(`${MessageTypes.GetStatus}`)
  GetSatus() {
    return {
      name: `${ServiceTypeTypes.AEERP}`,
      available: true,
      state: ServiceStateTypes.Normal,
    } as ServiceStatus;
  }
  @Get(`${MessageTypes.GetInConfig}`)
  GetInConfig() {
    const config = {
      production_supply: {
        units: 'tonns',
        limits: [0, 10000000],
        type: 'number',
      },
      tech_agent_id: {
        type: 'number',
        limits: [0, 1000000],
        units: 'identificator',
      },
    } as AEERPInConfig;
    return of(config);
  }
  @Get(`${MessageTypes.GetOutConfig}`)
  GetOutConfig() {
    const config = {
      tech_agent_id: {
        type: 'number',
        limits: [0, 1000000],
        units: 'identificator',
      },
    } as AEERPOutConfig;
    return of(config);
  }
  @Get(`${MessageTypes.AvailableData}`)
  IntroduceAvailableData() {
    return {
      type: typeof AEERPDto,
      count: this.appService.getAll().length,
      period: 'today',
    };
  }
  @Post(`${MessageTypes.AvailableData}`)
  GetData(payload: AEERPDto[]) {
    console.log('data transmitted');
    this.appService.addFields(payload);
  }
  @Get(`${MessageTypes.ReqiredData}`)
  SendData() {
    return this.appService.getAll();
  }
}
