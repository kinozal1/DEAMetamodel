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

export class AEMGISInConfig {
  tech_agent_id:FieldFormat;
  lat: FieldFormat;
  lon: FieldFormat;
}
export class AEMGISOutConfig {
  enterprise_id:FieldFormat;
  remaining_supplies: FieldFormat;
}