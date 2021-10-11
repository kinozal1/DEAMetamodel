import { Injectable } from '@nestjs/common';
import {
  ServiceApiInterface,
  TechnicalAgentDto,
} from '../../sharedresources/general_resources/build/main';

@Injectable()
export class AppService implements ServiceApiInterface<TechnicalAgentDto> {
  technicalAgentRepository: TechnicalAgentDto[] = [];

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
      x.id === id;
    });
  }
  getAll(): TechnicalAgentDto[] {
    return this.technicalAgentRepository;
  }
}
