import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { of } from 'rxjs';
import { AppService } from './app.service';
import axios from 'axios';
import {
  MessageTypes,
  MicroserviceApiInterface,
  AEAHSDto,
  AEAHSOutConfig,
  AEAHSInConfig,
  ServiceTypeTypes,
  ServiceStateTypes,
  ServiceStatus,
  AvailableData,
  TopicTypes,
  Message,
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
  @Get(`${MessageTypes.AvailableData}`)
  IntroduceAvailableData() {
    return {
      type: typeof AEAHSDto,
      count: this.appService.getAll().length,
      period: 'today',
    } as AvailableData;
  }
  @Post(`${MessageTypes.AvailableData}`)
  GetData(@Body() payload: AEAHSDto[]) {
    console.log('data transmitted');
    return this.appService.addFields(payload as AEAHSDto[]);
  }
  @Get(`${MessageTypes.ReqiredData}`)
  SendData() {
    console.log('data received');
    return this.appService.getAll();
  }

  @Get(`${MessageTypes.ReqiredData}/:servicetype`)
  SendParamData(@Param('servicetype') servicetype: string) {
    const val = this.appService.getAll();
    console.log(`parametrized data received with type ${typeof val}`);
    return val;
  }

  @Get(`${MessageTypes.GetOutConfig}`)
  GetOutConfig<AEAHSConfig>() {
    const config = {
      data: { type: 'Mine trucks', limits: [130], units: 'tonns' },
      lat: { type: 'latitude', limits: [0, 360], units: 'degrees' },
      lon: { type: 'longitude', limits: [0, 360], units: 'degrees' },
      production_supply: {
        type: 'production',
        limits: [0, 10000000],
        units: 'Tonns',
      },
      tech_agent_id: {
        type: 'identificator',
        limits: [0, 1000000],
        units: 'number',
      },
    } as AEAHSOutConfig;
    return of(config);
  }
  @Get(`${MessageTypes.GetInConfig}`)
  GetInConfig<AEAHSConfig>() {
    const config = {
      lat: { type: 'latitude', limits: [0, 360], units: 'degrees' },
      lon: { type: 'longitude', limits: [0, 360], units: 'degrees' },
      speedFact: { type: 'latitude', limits: [0, 360], units: 'degrees' },
      weight: { type: 'longitude', limits: [0, 360], units: 'degrees' },
    } as AEAHSInConfig;
    return of(config);
  }

  @Get('/init')
  Init() {
    axios.post(`${global.BUS_ADDRESS}/event`, {
      topic: TopicTypes.TechnicalAgentData,
      event: MessageTypes.ReqiredData,
      sender: ServiceTypeTypes.AEAHS,
    } as Message);
  }
}
