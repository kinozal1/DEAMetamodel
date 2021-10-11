export class ServiceInfo {
  id: number;
  name: string;
  available: boolean;
  instance: any;
  config: any;
  quality: number;
}

export class RegisterService {
  name: string;
  adress: string;
  port: number;
  type: string;
}
