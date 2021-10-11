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

export class AEAHSConfig {
  data: FieldFormat;
}