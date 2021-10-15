import { Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import axios from 'axios';
import { from } from 'rxjs';

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
  AEAHSDto,
  TechnicalAgentDto,
  fromtechAgentToAhs,
  fromMgisToErp,
  fromAhsToMgis,
  AEMGISDto,
} from '../../sharedresources/general_resources/build/main';

@Injectable()
export class AppService implements BusService {
  constructor() {}

  publishersQueue: Queue[] = [];
  subscribersQueue: Queue[] = [];
  services: ServiceInfo[] = [];

  CheckQueue(topic: TopicTypes, messageType: MessageTypes) {
    const fromQueve = this.subscribersQueue.find((x) => {
      return x?.topic == topic;
    });

    const toQueve = this.publishersQueue.find((x) => {
      return x.topic == topic;
    });
    if (fromQueve == null || undefined || toQueve == null || undefined)
      return { fromQueve: null, toQueve: null };
    // return this.services.find((x) => {
    //   return x.name === que.fromService;
    // });
    return {
      fromQueve: this.services.find((x) => {
        return x.name === fromQueve.fromService;
      }),
      toQueve: this.services.find((x) => {
        return x.name === toQueve.fromService;
      }),
    };
  }

  MapData(serviceInfo: ServiceInfo, data: any) {
    switch (serviceInfo.name) {
      case ServiceTypeTypes.AEAHS: {
        // const outdata = (data as TechnicalAgentDto[]).map((x)=>{
        //   return {sender:x.sender, timestamp:x.timestamp, data:{id:x.sender.id, tech_agent_id: x.sender.id, }} as AEAHSDto
        // })
        let dat = data as TechnicalAgentDto[];
        return fromtechAgentToAhs(dat);
      }
      case ServiceTypeTypes.AEERP: {
        let dat = data as AEAHSDto[];
        return fromMgisToErp(dat);
      }
      case ServiceTypeTypes.AEMGIS: {
        let dat: AEAHSDto[] = [];

        return fromAhsToMgis(data);
      }
      case ServiceTypeTypes.AETechnicalAgent: {
        return mapToAny<typeof data, TechnicalAgentData>(data);
      }
    }
  }

  GetDataType(serviceInfo: ServiceInfo) {}

  SendMessageToService(toService: ServiceInfo, fromService: ServiceInfo) {
    const data = axios
      .get(
        `${fromService.address}:${fromService.port}/${MessageTypes.ReqiredData}`,
      )
      .then((dat) => {
        const dto = this.MapData(toService, dat.data);
        axios.post(
          `${toService.address}:${toService.port}/${MessageTypes.AvailableData}`,
          dto,
        );
      });
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
      fromService: message.sender as ServiceTypeTypes,
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
