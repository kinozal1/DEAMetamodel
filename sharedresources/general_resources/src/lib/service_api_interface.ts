import { MessageTypes, ServiceInfo, TopicTypes } from '..';

export interface ServiceApiInterface<T> {
  addField(data: T): T;
  editField(id: number): T;
  removeField(id: number);
  getField(id: number): T;
  getAll(): T[];
}

export interface ServiceState {
  GetStatus(name: string);
  CheckQueue(topic: TopicTypes, messagetype: MessageTypes);
  GetAllAvailableServices();
  SendMessageToService(service: ServiceInfo, data: any);
}

export interface BusService extends ServiceState {
  MapData(fromType: any, toType: any);
  GetDataType(serviceInfo: ServiceInfo);
}

export interface MicroserviceApiInterface {
  GetSatus();
  GetConfig<T>(config: T);
  IntroduceAvailableData();
  GetData(payload: any);
  SendData();
}
