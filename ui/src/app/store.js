import { configureStore } from '@reduxjs/toolkit';
import meterReadingsReducer from "../features/meterReadings/meterReadingsSlice";

export default configureStore({
  reducer: {
    meterReadings: meterReadingsReducer
  },
});
