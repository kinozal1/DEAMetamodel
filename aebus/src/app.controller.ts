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
  AddEvent(@Body() message: Message ){
      const eventState = this.appService.AddEventToQueue(message);
      const availableQueue = this.appService.CheckQueue(eventState.topic, eventState.mesageType);
      if(availableQueue!=null || undefined){
        this.SendMessageToService(availableQueue, message.body);
      }
  }

  SendMessageToService(service: ServiceInfo, data: any) {
    throw new Error('Method not implemented.');
  }
  
}
