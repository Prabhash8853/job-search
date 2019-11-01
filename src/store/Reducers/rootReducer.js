import { combineReducers } from 'redux';
import fetchJobReducer from '../Reducers/JobSearchReducer';

const rootReducer = combineReducers({
    fetchJobReducer: fetchJobReducer
});

export default rootReducer;