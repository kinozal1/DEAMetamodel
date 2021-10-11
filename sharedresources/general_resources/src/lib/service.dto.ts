import { ServiceStateTypes, ServiceTypeTypes } from '..';

export class ServiceInfo {
  id: number;
  name: string;
  available: boolean;
  instance: any;
  config: any;
  quality: number;
  type: ServiceTypeTypes;
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
