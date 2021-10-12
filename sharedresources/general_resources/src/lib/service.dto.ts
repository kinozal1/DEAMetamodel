import { ServiceStateTypes, ServiceTypeTypes } from '..';

export class ServiceInfo {
  id: number;
  name: string;
  available: boolean;
  instance: any;
  config: any;
  quality: number;
  type: ServiceTypeTypes;
  port: number;
  address: string;
}

export class RegisterService {
  name: string;
  adress: string;
  port: number;
  type: ServiceTypeTypes;
}

export class ServiceStatus {
  name: string;
  available: boolean;
  state: ServiceStateTypes;
}

export class AvailableData {
  type: string;
  count: number;
  period: string;
}
