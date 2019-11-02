import * as actionTypes from './Types';
import axios from 'axios';

export const fetchJobStart = () => {
    return {
        type: actionTypes.FETCH_JOB_START,
    }
}

export const fetchJobSuccess = (data) => {
    return {
        type: actionTypes.FETCH_JOB_SUCCESS,
        payload: data
    }
}

export const fetchJobFail = (err) => {
    return {
        type: actionTypes.FETCH_JOB_FAIL,
        payload: err
    }
}

export const fetchJobAction = (data) => dispatch => {
    dispatch(fetchJobStart());
    var jobLanguage = data.description
    axios.get(`https://jobs.github.com/positions.json?description=${jobLanguage}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "Access-Control-Allow-Origin",
        },
    })
        .then(res => {
            dispatch(fetchJobSuccess(res.data));
        })
        .catch(err => {
            dispatch(fetchJobFail(err))
        })
}

export const setViewJobDetails = jobdetails => {
    return {
        type: actionTypes.SET_VIEW_JOB_DETAILS,
        payload : jobdetails
    }
}

export const setApplicantDetail = applicantDetails => {
    console.log(applicantDetails)
    return {
        type: actionTypes.SET_VIEW_APPLICANT_FORM,
        payload : applicantDetails
    }
}

