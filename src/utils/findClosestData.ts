import { IntensityData } from '../types/intensityRawData';
import { VDOTData } from '../types/VDOTData';

// 가장 가까운 VDOT 데이터를 찾는 함수
export const findClosestData = <T extends VDOTData | IntensityData>(Data: T[], vdot: number): T => {
  const flooredVDOT = Math.floor(vdot);
  let closest = Data[0];
  let smallestDiff = Math.abs(flooredVDOT - closest.VDOT);

  Data.forEach((data) => {
    const currentDiff = Math.abs(flooredVDOT - data.VDOT);
    if (currentDiff < smallestDiff) {
      smallestDiff = currentDiff;
      closest = data;
    }
  });

  return closest;
};
