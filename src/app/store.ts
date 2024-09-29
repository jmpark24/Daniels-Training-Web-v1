import { configureStore } from '@reduxjs/toolkit';
import vdotReducer from '../features/vdot/vdotSlice';
import intensityReducer from '../features/intensity/intensitySlice';

const store = configureStore({
  reducer: {
    vdot: vdotReducer,
    intensity: intensityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
