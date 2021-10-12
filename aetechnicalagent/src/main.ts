import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import axios from 'axios';
import {
  RegisterService,
  ServiceTypeTypes,
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
  });
}
main();
