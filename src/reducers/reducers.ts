import characterReducer from './characterReducer';
import { raceApiSlice } from '../api/raceApiSlice';

const getReducers = {
    [raceApiSlice.reducerPath]: raceApiSlice.reducer,
    character: characterReducer,
};

export default getReducers;