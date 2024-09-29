import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VDOTData } from '../../types/VDOTData';
import { findClosestData } from '../../utils/findClosestData';
import { maleVdotData } from '../../constants/VDOTData'; // 데이터를 가져오는 부분

interface VDOTState {
  calculatedVDOT: number | null;
  closestVDOT: VDOTData | null;
}

const initialState: VDOTState = {
  calculatedVDOT: null,
  closestVDOT: null,
};

const vdotSlice = createSlice({
  name: 'vdot',
  initialState,
  reducers: {
    setCalculatedVDOT: (state, action: PayloadAction<number>) => {
      state.calculatedVDOT = action.payload;
      state.closestVDOT = findClosestData(maleVdotData, action.payload) as VDOTData;
    },
    incrementByVDOT: (state) => {
      if (state.calculatedVDOT) {
        const newVDOT = state.calculatedVDOT + 1;
        state.calculatedVDOT = newVDOT;
        state.closestVDOT = findClosestData(maleVdotData, newVDOT) as VDOTData;
      }
    },
    decrementByVDOT: (state) => {
      if (state.calculatedVDOT) {
        const newVDOT = state.calculatedVDOT - 1;
        state.calculatedVDOT = newVDOT;
        state.closestVDOT = findClosestData(maleVdotData, newVDOT) as VDOTData;
      }
    },
    setClosestVDOT: (state, action: PayloadAction<VDOTData>) => {
      state.closestVDOT = action.payload;
    },
  },
});

export const { setCalculatedVDOT, incrementByVDOT, decrementByVDOT, setClosestVDOT } =
  vdotSlice.actions;

export default vdotSlice.reducer;
