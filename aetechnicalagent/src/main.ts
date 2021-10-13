import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import axios from 'axios';
import {
  Message,
  MessageTypes,
  RegisterService,
  ServiceTypeTypes,
  TopicTypes,
} from '../../sharedresources/general_resources/build/main';

async function main() {
  global.BUS_ADDRESS = 'http://localhost:4000';
  global.PORT = 4002;
  global.ADDRESS = 'http://localhost';

  const registerInformation = {
    name: `${ServiceTypeTypes.AETechnicalAgent}`,
    adress: `${global.ADDRESS}`,
    port: global.PORT,
    type: `${ServiceTypeTypes.AETechnicalAgent}`,
  } as RegisterService;
  const app = await NestFactory.create(AppModule);
  await app.listen(global.PORT, () => {
    console.log(`AETechnicalAgent service is runnig on port ${global.PORT}`);
    axios.post(global.BUS_ADDRESS + '/register', registerInformation);

    axios.post(`${global.BUS_ADDRESS}/event`, {
      topic: TopicTypes.TechnicalAgentData,
      event: MessageTypes.AvailableData,
      sender: ServiceTypeTypes.AETechnicalAgent,
    } as Message);
  });
}
main();
