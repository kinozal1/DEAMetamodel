import { Controller, Get, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { of } from 'rxjs';
import { AppService } from './app.service';
import {
  AEAHSConfig,
  MessageTypes,
  MicroserviceApiInterface,
  AEAHSDto,
} from '../../sharedresources/general_resources/build/main';

@Controller()
export class AppController implements MicroserviceApiInterface {
  constructor(private readonly appService: AppService) {}

  @Get(`${MessageTypes.GetStatus}`)
  GetSatus() {
    return of('OK');
  }

  IntroduceAvailableData() {}
  @MessagePattern({ cmd: MessageTypes.ReqiredData })
  GetData(payload: AEAHSDto) {
    return this.appService.addField(payload as AEAHSDto);
  }
  @MessagePattern({ cmd: MessageTypes.AvailableData })
  SendData() {
    return this.appService.getAll();
  }

  @Post(`${MessageTypes.GetConfig}`)
  GetConfig<AEAHSConfig>() {
    const config = {
      data: { type: 'Mine truck', limits: [130], units: 'Tonns' },
    } as unknown as AEAHSConfig;
    return of(config);
  }
}
