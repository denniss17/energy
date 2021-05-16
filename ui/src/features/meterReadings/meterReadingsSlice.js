import {createSlice} from '@reduxjs/toolkit';
import api from '../../api/api';

export const meterReadingsSlice = createSlice({
    name: 'meterReadings',
    initialState: {
        loading: false,
        saving: false,
        error: null,

        dialogOpen: false,
        dialogMeterReadingId: null,

        // Normalized State, using an array of ids and a dictionary of entities
        // See https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
        // See https://redux-toolkit.js.org/usage/usage-guide#managing-normalized-data
        ids: [],
        entities: {}
    },
    reducers: {
        getAllStarted: (state, action) => {
            console.log(action);
            state.loading = true;
            state.error = null;
        },
        getAllFinished: (state, action) => {
            console.log(action);
            state.loading = false;
            state.ids = Object.keys(action.payload);
            state.entities = action.payload;
        },
        getAllError: (state, action) => {
            console.log(action);
            state.loading = false;
            state.error = {
                message: action.payload.message,
                // If this is an error from the server, add server response as details
                details: 'payload' in action.payload ? action.payload.payload : null
            }
        },
        createStarted: (state, action) => {
            console.log(action);
            state.saving = true;
            state.error = null;
        },
        createFinished: (state, action) => {
            console.log(action);
            state.saving = false;
        },
        createError: (state, action) => {
            console.log(action);
            state.saving = false;
            state.error = {
                message: action.payload.message,
                // If this is an error from the server, add server response as details
                details: 'payload' in action.payload ? action.payload.payload : null
            }
        },

        openMeterReadingDialog: (state, action) => {
            console.log(action);
            state.error = null;
            state.dialogMeterReadingId = action.payload;
            state.dialogOpen = true;
        },
        closeMeterReadingDialog: (state, action) => {
            console.log(action);
            state.error = null;
            state.dialogOpen = false;
        }
    },
});

export const {openMeterReadingDialog, closeMeterReadingDialog} = meterReadingsSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getAllMeterReadings = () => async dispatch => {
    dispatch(meterReadingsSlice.actions.getAllStarted());
    return api.getAll('meter-readings')
        .then(data => dispatch(meterReadingsSlice.actions.getAllFinished(data)))
        .catch(error => dispatch(meterReadingsSlice.actions.getAllError(error)));
};

export const createMeterReading = (meterReading) => async dispatch => {
    dispatch(meterReadingsSlice.actions.createStarted());
    api.create('meter-readings', meterReading)
        .then(data => dispatch(meterReadingsSlice.actions.createFinished(data)))
        .then(() => dispatch(closeMeterReadingDialog()))
        .then(() => dispatch(getAllMeterReadings()))
        .catch(error => dispatch(meterReadingsSlice.actions.createError(error)));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectMeterReadings = state => Object.values(state.meterReadings.entities);
export const selectMeterReading = id => state => state.meterReadings.entities[id];
export const selectIsMeterReadingsLoading = state => state.meterReadings.loading;
export const selectIsMeterReadingsSaving = state => state.meterReadings.saving;
export const selectIsMeterReadingDialogOpen = state => state.meterReadings.dialogOpen;
export const selectMeterReadingsError = state => state.meterReadings.error;
export const selectMeterReadingDialogMeterReadingId = state => state.meterReadings.dialogMeterReadingId;

export default meterReadingsSlice.reducer;
