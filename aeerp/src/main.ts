import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  Message,
  MessageTypes,
  RegisterService,
  ServiceTypeTypes,
  TopicTypes,
} from '../../sharedresources/general_resources/build/main';
import axios from 'axios';
async function main() {
  global.BUS_ADDRESS = 'http://localhost:4000';
  global.PORT = 4004;
  global.ADDRESS = 'http://localhost';

  const registerInformation = {
    name: `${ServiceTypeTypes.AEERP}`,
    adress: `${global.ADDRESS}`,
    port: global.PORT,
    type: `${ServiceTypeTypes.AEERP}`,
  } as RegisterService;
  const app = await NestFactory.create(AppModule);
  await app.listen(global.PORT, () => {
    console.log(`AEAHS service is runnig on port ${global.PORT}`);
    axios.post(global.BUS_ADDRESS + '/register', registerInformation);
    axios.post(`${global.BUS_ADDRESS}/event`, {
      topic: TopicTypes.ERPData,
      event: MessageTypes.ReqiredData,
      sender: ServiceTypeTypes.AEERP,
    } as Message);
  });
}
main();
