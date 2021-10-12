import { FieldFormat, Sender, TechnicalAgentData } from './technicalagent.dto';

export class AEAHSDto {
  sender: Sender;
  timestamp: string[];
  data: AEAHSData[];
}

export class AEAHSData {
  id: number;
  tech_agent_id: number;
  data: TechnicalAgentData[];
}

export class AEAHSOutConfig {
  tech_agent_id: FieldFormat;
  production_supply: FieldFormat;
  lat: FieldFormat;
  lon: FieldFormat;
}

export class AEAHSInConfig {
  id: FieldFormat;
  weight: FieldFormat;
  speedFact: FieldFormat;
  lat: FieldFormat;
  lon: FieldFormat;
}
