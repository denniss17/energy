import {configureStore} from '@reduxjs/toolkit';
import meterReadingsReducer from "../features/meterReadings/meterReadingsSlice";
import metersReducer from "../features/meters/metersSlice";

export default configureStore({
    reducer: {
        meters: metersReducer,
        meterReadings: meterReadingsReducer
    },
});
