import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ServiceState,
  ServiceStateTypes,
  ServiceApiInterface,
  MessageTypes,
  RegisterService,
  Message,
  ServiceInfo,
} from '../../sharedresources/general_resources/build/main';
import { AppService } from './app.service';

@Controller()
export class AppController implements ServiceState {
  constructor(private readonly appService: AppService) {}

  GetAllAvailableServices() {}

  @Post('/register')
  RegisterService(@Body() dto: RegisterService) {
    return this.appService.registerService(dto);
  }

  @Get('/status/:id')
  GetStatus() {
    return this.appService.GetStatus('id');
  }
  @Get('/status')
  GetAll() {
    return this.appService.GetAllAvailableServices();
  }
  @Get('/queue')
  CheckQueue() {}

  @Post('/event')
  AddEvent(@Body() message: Message) {
    console.log(`Event from ${message.sender}, with ${message.topic} topic`);
    const eventState = this.appService.AddEventToQueue(message);
    const { fromQueve, toQueve } = this.appService.CheckQueue(
      eventState.topic,
      eventState.mesageType,
    );
    if ((fromQueve != null || undefined) && (toQueve != null || undefined)) {
      this.appService.SendMessageToService(fromQueve, toQueve);
      console.log(`Match found with ${fromQueve.name} and ${toQueve.name}`);
    }
  }

  SendMessageToService(service: ServiceInfo, data: any) {}
}
