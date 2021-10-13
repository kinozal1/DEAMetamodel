import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  AvailableData,
  Message,
  MessageTypes,
  MicroserviceApiInterface,
  ServiceStateTypes,
  ServiceStatus,
  ServiceTypeTypes,
  TechnicalAgentDto,
  TechnicalAgentOutConfig,
  TopicTypes,
} from '../../sharedresources/general_resources/build/main';
import { of } from 'rxjs';
import axios from 'axios';

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
  GetInConfig<T>() {
    return of('Config is empty');
  }
  @Get(`${MessageTypes.GetOutConfig}`)
  GetOutConfig<T>() {
    const config = {
      lat: { limits: [0, 360], type: 'number', units: 'degrees' },
      lon: { limits: [0, 360], type: 'number', units: 'degrees' },
      speedFact: { limits: [0, 60], type: 'number', units: 'km/h' },
      weight: { limits: [0, 450], type: 'number', units: 'tonns' },
    } as TechnicalAgentOutConfig;
    return of(config);
  }
  @Get(`${MessageTypes.AvailableData}`)
  IntroduceAvailableData() {
    return {
      type: typeof TechnicalAgentDto,
      count: this.appService.getAll().length,
      period: 'today',
    } as AvailableData;
  }
  @Post(`${MessageTypes.AvailableData}`)
  GetData(@Body() payload: any) {
    console.log('data transmitted');
    this.appService.addField(payload);
  }
  @Get(`${MessageTypes.ReqiredData}`)
  SendData() {
    console.log('data received');
    return this.appService.getAll();
  }

  //API  functions for testing

  @Get('/init')
  Init() {
    const url = `${global.BUS_ADDRESS}/event`;
    console.log(url);
    axios.post(url, {
      topic: TopicTypes.TechnicalAgentData,
      event: MessageTypes.AvailableData,
      sender: ServiceTypeTypes.AETechnicalAgent,
    } as Message);
  }
}
