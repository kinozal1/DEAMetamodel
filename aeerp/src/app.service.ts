import { Injectable } from '@nestjs/common';
import {
  AEERPDto,
  ServiceApiInterface,
} from '../../sharedresources/general_resources/build/main';

@Injectable()
export class AppService implements ServiceApiInterface<AEERPDto> {
  aeerpData: AEERPDto[] = [];

  addField(data: AEERPDto): AEERPDto {
    this.aeerpData.push(data);
    return data;
  }
  editField(id: number): AEERPDto {
    return null;
  }
  removeField(id: number) {
    return null;
  }
  getField(id: number): AEERPDto {
    return this.aeerpData.find((x) => {
      x.sender.id === id;
    });
  }
  getAll(): AEERPDto[] {
    return this.aeerpData;
  }
}
