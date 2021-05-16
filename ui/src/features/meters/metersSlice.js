import {createSlice} from '@reduxjs/toolkit';
import api from '../../api/api';

export const metersSlice = createSlice({
    name: 'meters',
    initialState: {
        loading: false,
        submitting: false,
        error: null,

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
        }
    },
});

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getAllMeters = () => async dispatch => {
    dispatch(metersSlice.actions.getAllStarted());
    return api.getAll('meters')
        .then(data => dispatch(metersSlice.actions.getAllFinished(data)))
        .catch(error => dispatch(metersSlice.actions.getAllError(error)));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectMeters = state => Object.values(state.meters.entities);
export const selectIsMetersLoading = state => state.meters.loading;
export const selectIsMetersError = state => state.meters.error;

export default metersSlice.reducer;
