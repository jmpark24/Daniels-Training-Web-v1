import { RootState } from '../../app/store';

export const selectClosestIntensity = (state: RootState) => state.intensity.closestIntensity;
