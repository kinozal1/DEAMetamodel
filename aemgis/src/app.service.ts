import { Injectable } from '@nestjs/common';
import {
  AEMGISDto,
  ServiceApiInterface,
} from '../../sharedresources/general_resources/build/main';

@Injectable()
export class AppService implements ServiceApiInterface<AEMGISDto> {
  aemgisRepository: AEMGISDto[] = [];

  addField(data: AEMGISDto): AEMGISDto {
    this.aemgisRepository.push(data);
    return data;
  }
  addFields(data: AEMGISDto[]): AEMGISDto[] {
    if (data === null || undefined) return null;
    console.log(`data wrote with count ${data.length}`);
    this.aemgisRepository.push(...data);
    return data;
  }
  editField(id: number): AEMGISDto {
    return;
  }
  removeField(id: number) {
    return;
  }
  getField(id: number): AEMGISDto {
    return this.aemgisRepository.find((x) => {
      x.sender.id === id;
    });
  }
  getAll(): AEMGISDto[] {
    return this.aemgisRepository;
  }
}
