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

export class AEERPConfig {
  production_supply: FieldFormat;
}
