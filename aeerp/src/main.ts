import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RegisterService, ServiceTypeTypes } from '../../sharedresources/general_resources/build/main';
import axios from 'axios';
async function main() {
  global.BUS_ADDRESS = 'http://localhost:4000';
  global.PORT = 4004;
  global.ADDRESS = 'http://localhost';

  const registerInformation = {
    name: `${ServiceTypeTypes.AEAHS}`,
    adress: `${global.ADDRESS}`,
    port: global.PORT,
    type: `${ServiceTypeTypes.AEAHS}`,
  } as RegisterService;
  const app = await NestFactory.create(AppModule);
  await app.listen(global.PORT, () => {
    console.log(`AEAHS service is runnig on port ${global.PORT}`);
    axios.post(global.BUS_ADDRESS + '/register', registerInformation);
  });
}
main();
