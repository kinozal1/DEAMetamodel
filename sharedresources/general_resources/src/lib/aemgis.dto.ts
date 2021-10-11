import { FieldFormat, Sender } from './technicalagent.dto';

export class AEMGISDto {
  sender: Sender;
  timestamp: string[];
  data: AEMGISData[];
}

export class AEMGISData {
  id: number;
  tech_agent_id: number;
  lat: number;
  lon: number;
}

export class AEMGISConfig {
  lat: FieldFormat;
  lon: FieldFormat;
}
