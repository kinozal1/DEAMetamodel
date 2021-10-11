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
  AEMineTuck = 'AEMineTruckData',
  AEERP = 'AEERP',
}

export enum TopicTypes {
  MineTruckData = 'MineTruckData',
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
