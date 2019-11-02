import React from 'react';
import { connect } from "react-redux";
import "./DisplayApplicant.css"

const DisplayApplicant = (props) => {

    if (props.applicantDetails.length !== 0) {
        var displayComponent = (
            <div  className="display_applicant">
                <div className="applicant-details">
                    <p className = "pd-10"><span className = "span"> Name: </span>{props.applicantDetails.applicantData.name}</p>
                    <p className = "pd-10"><span className = "span">Email: </span > {props.applicantDetails.applicantData.email}</p>
                    <p className = "pd-10"><span className = "span">Cover Letter Note: </span>{props.applicantDetails.applicantData.coverLetter}</p>
                    <p className = "pd-10"><span className = "span">Applied Company:</span> {props.applicantDetails.company}</p>
                </div>
                <div className="uploaded_image">
                <span className = "span">Uploaded File:</span><a href={props.applicantDetails.fileUrl} target = "_blank">{props.applicantDetails.applicantFile.name}</a>
                </div>
            </div>)
            return displayComponent
    }
    else{
        displayComponent = (<div className = "message">Sorry No Data Found</div>)
    }
    return (
        <div className="display_applicant">
            {displayComponent}
        </div>
    );
}

const mapDispatchToProps = dispatch => { }

const mapStateToProps = (state) => {
    return {
        applicantDetails: state.fetchJobReducer.viewApplicantDetails
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayApplicant);