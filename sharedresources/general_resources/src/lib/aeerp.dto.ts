import { FieldFormat, Sender } from '..';

export class AEERPDto {
  sender: Sender;
  timestamp: string[];
  data: AEERPData[];
}

export class AEERPData {
  id: number;
  production_supply: number;
}

export class AEERPInConfig {
  tech_agent_id: FieldFormat;
  production_supply: FieldFormat;
}
export class AEERPOutConfig {
  tech_agent_id: FieldFormat;
  plan: FieldFormat;
}