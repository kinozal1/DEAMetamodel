import {
  AEAHSData,
  AEAHSDto,
  AEERPData,
  AEERPDto,
  AEMGISData,
  AEMGISDto,
  TechnicalAgentDto,
} from '..';

export function mapToAny<T, V>(inputArray: T[]): V[] {
  return inputArray as unknown as V[];
}

export function fromtechAgentToAhs(inputData: TechnicalAgentDto[]) {
  let val: AEAHSDto[] = [];
  inputData.map((x) => {
    const mapped: AEAHSDto = {
      sender: x.sender,
      timestamp: x.timestamp,
      data: [
        { id: 100, tech_agent_id: x.sender.id, data: x.data } as AEAHSData,
      ],
    };
    val.push(mapped);
  });
  return val;
}

export function fromAhsToMgis(inputDat: AEAHSDto[]) {
  let val: AEMGISDto[] = [];

  inputDat.forEach((element) => {
    let mgisdata: AEMGISData[] = [];

    element.data.forEach((y) => {
      y.data.map((c) => {
        mgisdata.push({
          id: 100,
          tech_agent_id: element.sender.id,
          lat: c?.lat,
          lon: c?.lon,
        } as AEMGISData);
      });
    });
    const mapped: AEMGISDto = {
      sender: element.sender,
      timestamp: element.timestamp,
      data: mgisdata,
    };
    val.push(mapped);
  });

  return val;
}

export function fromMgisToErp(inputData: AEAHSDto[]) {
  let val: AEERPDto[] = [];

  inputData.map((x) => {
    let summArray = x.data.map((y) => {
      return {
        id: x.sender.id,
        production_supply: y.data.reduce(
          (accum, item) => accum + item.weight,
          0
        ),
      } as AEERPData;
    });
    val.push({
      sender: x.sender,
      timestamp: x.timestamp,
      data: summArray,
    } as AEERPDto);
  });
  return val;
}
