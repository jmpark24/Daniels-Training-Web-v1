import { RootState } from '../../app/store';

export const selectCalculatedVDOT = (state: RootState) => state.vdot.calculatedVDOT;
export const selectClosestVDOT = (state: RootState) => state.vdot.closestVDOT;
