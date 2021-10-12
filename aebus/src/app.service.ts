import { Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import axios from 'axios';

import {
  Queue,
  RegisterService,
  ServiceInfo,
  ServiceTypeTypes,
  EventDependencies,
  Message,
  MessageTypes,
  TopicTypes,
  BusService,
  mapToAny,
  AEAHSData,
  AEERPData,
  AEMGISData,
  TechnicalAgentData,
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
          x.name === que.fromService;
        });
      }
      case MessageTypes.ReqiredData: {
        const que = this.publishersQueue.find((x) => {
          x.topic == topic;
        });
        return this.services.find((x) => {
          x.name === que.fromService;
        });
      }
    }
  }

  MapData(serviceInfo: ServiceInfo, data: any) {
    switch (serviceInfo.name) {
      case ServiceTypeTypes.AEAHS: {
        return mapToAny<typeof data, AEAHSData>(data);
      }
      case ServiceTypeTypes.AEERP: {
        return mapToAny<typeof data, AEERPData>(data);
      }
      case ServiceTypeTypes.AEMGIS: {
        return mapToAny<typeof data, AEMGISData>(data);
      }
      case ServiceTypeTypes.AETechnicalAgent: {
        return mapToAny<typeof data, TechnicalAgentData>(data);
      }
    }
  }

  GetDataType(serviceInfo: ServiceInfo) {}

  SendMessageToService(service: ServiceInfo, data: any) {
    
    axios.post(`${service.address}:${service.port}`, data);
  }
  GetAllAvailableServices() {
    return this.services;
  }

  async GetStatus(id: string) {
    await this.services.find((x) => {
      x.id.toString() === id;
    });
  }

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
      address: service.adress,
      port: service.port,
      type: service.type,
      available: true,
      config: null,
      instance: null,
      quality: 100,
    } as ServiceInfo;
    const servi = this.services.find((x) => {
      return x.name === serv.name;
    });

    if (servi === undefined || null) {
      await this.services.push(serv);
      console.log(`${serv.name} has been registered on Bus!`);
    } else {
      return HttpErrorByCode[409];
    }
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
