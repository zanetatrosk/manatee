import { combineReducers } from 'redux';
import characterReducer from './characterReducer';

const getReducers = {
    character: characterReducer,
};

export default getReducers;