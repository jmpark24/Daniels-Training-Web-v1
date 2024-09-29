import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IntensityData } from '../../types/intensityRawData';
import { findClosestData } from '../../utils/findClosestData';
import { intensityData } from '../../constants/intensityData';

interface IntensityState {
  calculatedVDOT: number | null;
  closestIntensity: IntensityData | null;
}

const initialState: IntensityState = {
  calculatedVDOT: null,
  closestIntensity: null,
};

const intensitySlice = createSlice({
  name: 'intensity',
  initialState,
  reducers: {
    setClosestIntensity: (state, action: PayloadAction<number>) => {
      state.calculatedVDOT = action.payload;
      state.closestIntensity = findClosestData(intensityData, action.payload) as IntensityData;
    },
    incrementIntensity: (state) => {
      if (state.calculatedVDOT) {
        const newVDOT = state.calculatedVDOT + 1;
        state.calculatedVDOT = newVDOT;
        state.closestIntensity = findClosestData(intensityData, newVDOT) as IntensityData;
      }
    },
    decrementIntensity: (state) => {
      if (state.calculatedVDOT) {
        const newVDOT = state.calculatedVDOT - 1;
        state.calculatedVDOT = newVDOT;
        state.closestIntensity = findClosestData(intensityData, newVDOT) as IntensityData;
      }
    },
  },
});

export const { setClosestIntensity, incrementIntensity, decrementIntensity } =
  intensitySlice.actions;

export default intensitySlice.reducer;
