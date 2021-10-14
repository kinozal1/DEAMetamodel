import { Injectable } from '@nestjs/common';
import {
  MockAEAHSDTOdata,
  ServiceApiInterface,
  TechnicalAgentDto,
} from '../../sharedresources/general_resources/build/main';

@Injectable()
export class AppService implements ServiceApiInterface<TechnicalAgentDto> {
  technicalAgentRepository: TechnicalAgentDto[] = JSON.parse(MockAEAHSDTOdata);

  addField(data: TechnicalAgentDto): TechnicalAgentDto {
    this.technicalAgentRepository.push(data);
    return data;
  }
  editField(id: number): TechnicalAgentDto {
    return;
  }
  removeField(id: number) {
    return;
  }
  getField(id: number): TechnicalAgentDto {
    return this.technicalAgentRepository.find((x) => {
      x.sender.id === id;
    });
  }
  getAll(): TechnicalAgentDto[] {
    return this.technicalAgentRepository;
  }
}
