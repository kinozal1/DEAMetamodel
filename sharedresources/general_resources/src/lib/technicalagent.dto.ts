export class TechnicalAgentDto {
  id: number;
  sender: Sender;
  timestamp: string[];
  data: TechnicalAgentData[];
}

export class TechnicalAgentData {
  weight: number;
  speedFact: number;
  lat: number;
  lon: number;
}

export class TechnicalAgentOutConfig {
  weight: FieldFormat;
  speedFact: FieldFormat;
  lat: FieldFormat;
  lon: FieldFormat;
}

export class Sender {
  id: number;
  name: string;
  adress: string;
}

export class FieldFormat {
  type: string;
  limits: number[];
  units: string;
}
