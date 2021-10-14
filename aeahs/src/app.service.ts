import { Injectable } from '@nestjs/common';
import {
  AEAHSDto,
  ServiceApiInterface,
  MockAEAHSDTOdata,
} from '../../sharedresources/general_resources/build/main';
const faker = require('faker');
@Injectable()
export class AppService implements ServiceApiInterface<AEAHSDto> {
  constructor() {}

  aeahsData: AEAHSDto[] = [];

  addField(data: AEAHSDto): AEAHSDto {
    this.aeahsData.push(data);
    return data;
  }
  addFields(data: AEAHSDto[]): AEAHSDto[] {
    if (data !== undefined) {
      this.aeahsData.push(...data);
      console.log('Data wrote');
    }

    return data;
  }
  editField(id: number): AEAHSDto {
    return null;
  }
  removeField(id: number) {
    return null;
  }
  getField(id: number): AEAHSDto {
    return this.aeahsData.find((x) => {
      x.sender.id === id;
    });
  }
  getAll(): AEAHSDto[] {
    return this.aeahsData;
  }

  getAllParameterized() {}
}
