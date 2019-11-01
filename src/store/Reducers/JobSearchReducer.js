import * as actionTypes from '../Actions/Types';
import * as utility from '../../utility/utility';

const initialState = {
    error: null,
    data: [],
    viewDetails : {}
}

const fetchJobSuccess = (state, action) => {
    return utility.updateObject(state, {
        error: null,
        data: [...action.payload.map((data) => { return { ...data, displayDetails: false } })]
    });
}


const fetchJobFail = (state, action) => {
    return utility.updateObject(state, {
        error: action.payload,
    });
}


const fetchJobReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_JOB_SUCCESS: return fetchJobSuccess(state, action);
        case actionTypes.FETCH_JOB_FAIL: return fetchJobFail(state, action);
        case actionTypes.SET_VIEW_JOB_DETAILS : return {
            ...state,
            viewDetails : action.payload
        }
        default: return state;
    }
}


export default fetchJobReducer;