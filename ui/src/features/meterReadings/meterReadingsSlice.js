import {createSlice} from '@reduxjs/toolkit';
import api from '../../api/api';

export const meterReadingsSlice = createSlice({
    name: 'meterReadings',
    initialState: {
        loading: false,
        submitting: false,
        error: null,

        dialogOpen: false,

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
            state.error = action.payload;
        },
        createStarted: (state, action) => {
            console.log(action);
            state.submitting = true;
            state.error = null;
        },
        createFinished: (state, action) => {
            console.log(action);
            state.submitting = false;
        },
        createError: (state, action) => {
            console.log(action);
            state.submitting = false;
            state.error = {
                message: action.payload.message,
                // If this is an error from the server, add server response as details
                details: 'payload' in action.payload ? action.payload.payload : null
            }
        },

        openMeterReadingDialog: (state, action) => {
            console.log(action);
            state.dialogOpen = true;
        },
        closeMeterReadingDialog: (state, action) => {
            console.log(action);
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
        .catch(error => dispatch(meterReadingsSlice.actions.getAllError(error.payload)));
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
export const selectMeterReadingsLoading = state => state.meterReadings.loading;
export const selectMeterReadingsSubmitting = state => state.meterReadings.submitting;
export const selectMeterReadingsError = state => state.meterReadings.error;
export const selectMeterReadingDialogOpen = state => state.meterReadings.dialogOpen;

export default meterReadingsSlice.reducer;
