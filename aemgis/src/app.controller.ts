import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  AEMGISDto,
  AEMGISInConfig,
  AEMGISOutConfig,
  AvailableData,
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
  @Get(`${MessageTypes.GetInConfig}`)
  GetInConfig() {
    return {
      lat: { limits: [0, 360], type: 'number', units: 'degrees' },
      lon: { limits: [0, 360], type: 'number', units: 'degrees' },
      tech_agent_id: {
        limits: [0, 1000000],
        type: 'number',
        units: 'identificator',
      },
    } as AEMGISInConfig;
  }
  @Get(`${MessageTypes.GetOutConfig}`)
  GetOutConfig() {
    return {
      enterprise_id: {
        limits: [0, 1000000],
        type: 'number',
        units: 'identificator',
      },
      remaining_supplies: {
        limits: [0, 10000000],
        type: 'number',
        units: 'tonns',
      },
    } as AEMGISOutConfig;
  }
  @Get(`${MessageTypes.AvailableData}`)
  IntroduceAvailableData() {
    return {
      type: typeof AEMGISDto,
      count: this.appService.getAll().length,
      period: 'today',
    } as AvailableData;
  }
  @Post(`${MessageTypes.AvailableData}`)
  GetData(@Body() payload: AEMGISDto[]) {
    console.log('data transmitted');
    this.appService.addFields(payload);
  }
  @Get(`${MessageTypes.ReqiredData}`)
  SendData() {
    console.log('data received');
    return this.appService.getAll();
  }
}
