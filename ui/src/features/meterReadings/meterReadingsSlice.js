import {createSlice} from '@reduxjs/toolkit';

export const meterReadingsSlice = createSlice({
    name: 'meterReadings',
    initialState: {
        // Normalized State, using an array of ids and a dictionary of entities
        // See https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
        // See https://redux-toolkit.js.org/usage/usage-guide#managing-normalized-data
        ids: [],
        entities: {}
    },
    reducers: {
        getAllStarted: (state, action) => {
        },
        getAllFinished: (state, action) => {
        },
        getAllError: (state, action) => {
        }
    },
});

export const {getAllStarted, getAllFinished, getAllError} = meterReadingsSlice.actions;

console.log(meterReadingsSlice);

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getAll = () => async dispatch => {
    dispatch(meterReadingsSlice.actions.getAllStarted());
    const response = fetch("/api/meter-readings");
    // const data = response.json()
    // dispatch(meterReadingsSlice.actions.getAllFinished(data));
    // return data;
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectMeterReadings = state => Object.values(state.meterReadings.entities);

export default meterReadingsSlice.reducer;
