import * as actionTypes from '../Actions/Types';
import * as utility from '../../utility/utility';

const initialState = {
    error: null,
    data: [],
    viewDetails : [],
    viewApplicantDetails: [],
    loading: null
}

const fetchJobStart = (state, action) => {
    return utility.updateObject(state, {
        error: null,
        loading: true
    });
}


const fetchJobSuccess = (state, action) => {
    return utility.updateObject(state, {
        error: null,
        data: [...action.payload.map((data) => { return { ...data, displayDetails: false } })],
        loading: false
    });
}


const fetchJobFail = (state, action) => {
    return utility.updateObject(state, {
        error: action.payload,
    });
}

const fetchJobDetails = (state, action) => {
    return utility.updateObject(state, {
        viewDetails: action.payload,
    });
}

const fetchApplicantDetails = (state, action) => {
    return utility.updateObject(state, {
        viewApplicantDetails: action.payload,
    });
}



const fetchJobReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_JOB_START: return fetchJobStart(state, action);
        case actionTypes.FETCH_JOB_SUCCESS: return fetchJobSuccess(state, action);
        case actionTypes.FETCH_JOB_FAIL: return fetchJobFail(state, action);
        case actionTypes.SET_VIEW_JOB_DETAILS : return fetchJobDetails(state, action)
        case actionTypes.SET_VIEW_APPLICANT_FORM : return fetchApplicantDetails(state, action)
        default: return state;
    }
}


export default fetchJobReducer;