import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { randomInt, randomUUID } from 'crypto';

import {
  AEAHSConfig,
  Queue,
  RegisterService,
  ServiceInfo,
  TechnicalAgentConfig,
  ServiceState,
  ServiceApiInterface,
  ServiceTypeTypes,
  EventDependencies,
  Message,
  MessageTypes,
  TopicTypes,
  BusService,
  mapToAny,
  AEAHSData,
} from '../../sharedresources/general_resources/build/main';

@Injectable()
export class AppService implements BusService {
  constructor() {}

  publishersQueue: Queue[] = [];
  subscribersQueue: Queue[] = [];
  services: ServiceInfo[] = [];

  CheckQueue(topic: TopicTypes, messageType: MessageTypes) {
    switch (messageType) {
      case MessageTypes.AvailableData: {
        const que = this.subscribersQueue.find((x) => {
          x.topic == topic;
        });
        return this.services.find((x) => {
          x.type === que.fromService;
        });
      }
      // case MessageTypes.ReqiredData: {
      //   return this.publishersQueue.find((x) => {
      //     x.topic == topic;
      //   });
      // }
    }
  }

  MapData(serviceInfo: ServiceInfo, data: any) {
    switch (serviceInfo.type) {
      case ServiceTypeTypes.AEAHS: {
        return mapToAny<typeof data, AEAHSData>(data);
      }
      case ServiceTypeTypes.AEERP: {
        return mapToAny<typeof data, AEAHSData>(data);
      }
      case ServiceTypeTypes.AEMGIS: {
        return mapToAny<typeof data, AEAHSData>(data);
      }
      case ServiceTypeTypes.AEMineTuck: {
        return mapToAny<typeof data, AEAHSData>(data);
      }
    }
  }

  GetDataType(serviceInfo: ServiceInfo) {}

  SendMessageToService(service: ServiceInfo, data: any) {
    throw new Error('Method not implemented.');
  }
  GetAllAvailableServices() {
    return this.services;
  }

  async GetStatus(id: string) {}

  AddEventToQueue(message: Message) {
    const que = {
      fromService: message.sender,
      topic: message.topic,
      mesageType: message.event as MessageTypes,
      message: message.body,
    } as Queue;
    if (que.mesageType === MessageTypes.AvailableData) {
      this.publishersQueue.push(que);
    } else if (que.mesageType === MessageTypes.ReqiredData) {
      this.subscribersQueue.push(que);
    }
    return que;
  }

  async registerService(service: RegisterService) {
    const serv = {
      id: this.services.length + 1,
      name: service.name,
      adress: service.adress,
      port: service.port,
      type: ServiceTypeTypes[service.type as keyof typeof ServiceTypeTypes],
    } as ServiceInfo;
    await this.services.push(serv);
    return serv;
  }

  returnCommand(eventdependencies: EventDependencies) {
    switch (eventdependencies) {
      case EventDependencies.DataAilable: {
      }
    }
  }

  returnService(serviceType: ServiceTypeTypes) {
    switch (serviceType) {
      case ServiceTypeTypes.AEAHS: {
      }
      case ServiceTypeTypes.AEMGIS: {
      }
    }
  }
}
