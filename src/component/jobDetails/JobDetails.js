import React, { useState } from 'react';
import { connect } from "react-redux";
import './JobDetails.css';
import Modal from '../Modal/Modal';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function JobDetails({ details, clicked, history }) {
    const [modal, setModal] = useState(false)
    const [show, setModalShow] = useState(false)

    const handleModal = () => {
        setModal(true)
        setModalShow(true)
    }

    const handleBackdrop = () => {
        setModal(false)
    }


    const handleDate = (date) => {
        var published_Date = new Date(date)
        var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        var date_shown = monthName[published_Date.getMonth()] + " " + published_Date.getDate()
        return date_shown;
    }

    if (details.length !== 0) {
        var displayComponent = (
            <div className="job_details">
                <div className="card">
                    <div className="card_header">
                        <div className="job-title">
                            <p className="job-title-name">{details.title}</p>
                        </div>
                        <div className="company-logo">
                            <img src={details.company_logo} alt="company-logo" />
                        </div>
                    </div>


                    <div className="card-body">
                        <div className="company_details  fl-3">
                            <p className="company_name">{details.company}</p>
                        </div>

                        <div className="company_url fl-3">
                            <p className="company_url_value">
                                <a href={details.company_url}>
                                    {details.company_url}
                                </a>
                            </p>
                        </div>

                        <div className="job_location">
                            <p className="location">{details.location}</p>
                        </div>
                    </div>

                    <div className="card_description">
                        <div className="job_type fl-3">
                            <p>{details.type}</p>
                        </div>
                        <div className="post_time fl-3">
                            <p>{handleDate(details.created_at)}</p>
                        </div>
                        <div className="apply_btn fl-3">
                            <p>
                                <button
                                    className="btn_submit"
                                    type="submit"
                                    onClick={handleModal}
                                >
                                    Apply
                            </button>
                            </p>
                        </div>
                    </div>
                    <div className="job_description">
                        <p dangerouslySetInnerHTML={{ __html: details.description }}></p>
                    </div>

                    <div className="job_footer">
                        <div className="apply_button">
                            <button
                                className="btn_submit"
                                type="submit"
                                onClick={handleModal}
                            >
                                Apply
                        </button>
                        </div>
                    </div>
                </div>

                {
                    modal ? (<Modal
                        BackdropClicked={handleBackdrop}
                        show={show}
                        companyName={details.company} />) : null
                }
            </div>
        )
    }

    else{
        displayComponent = <div className="job_details">
                Sorry No Company Selected.... <Link to = "/">Please Select a Company</Link>
            </div>
    }

    return (
        <div>{displayComponent}</div>
    )
}

const mapDispatchToProps = dispatch => { }

const mapStateToProps = (state) => {
    return {
        details: state.fetchJobReducer.viewDetails
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails);