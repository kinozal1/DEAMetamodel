export enum ServiceStateTypes {
  Normal,
  NotSet,
  CorruptedModule,
  Fatal,
}

export enum ServiceTypeTypes {
  AEAHS = 'AEAHS',
  AEMGIS = 'AEMGIS',
  AEBUS = 'AEBUS',
  AETechnicalAgent = 'AETechnicalAgentData',
  AEERP = 'AEERP',
}

export enum TopicTypes {
  TechnicalAgentData = 'TechnicalAgentData',
  MGISData = 'MGISData',
  ERPData = 'ERPData',
  AHSData = 'AHSData',
}

export enum MessageTypes {
  AvailableData = 'AvailableData',
  ReqiredData = 'ReqiredData',
  GetStatus = 'GetStatus',
  SetConfig = 'SetConfig',
  GetConfig = 'GetConfig',
  Command = 'Command',
}

export enum EventDependencies {
  DataAilable = 'DataAvailable',
}
