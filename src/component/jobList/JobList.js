import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/Actions/FetchJobAction';
import './JobList.css';
import Loader from '../Loader/Loader';

class JobList extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            fetchedData: [],
            displayDetails: false,
        }
    }

    componentDidMount() {

        // the below function will fetch the id params from react-router and make
        // a api call to the github job searching API

        this.fetchJobs();

        this.setState({
            fetchedData: this.props.data
        })
    }


    fetchJobs = () => {
        const { id } = this.props.match.params
        this.props.getJobs(id);
    }

    handleDisplay = (jobdata) => {
        this.props.setViewJobDetails(jobdata);

        //the fetched data have unique id
        // we are redirecting the page having the details of particular job using react-redux to store the
        // data and pass it to another page
        this.props.history.push(`/job/${jobdata.id}/details`)
    }


    render() {
        if (!this.props.loading) {
            var displayComponent = displayComponent = <div className="row">
                {
                    this.props.data.map((data, index) => {
                        return (
                            <div className="col-md-12 col-xs-4 col-sm-6" key={index}>
                                <div className="cd">
                                    <div className="company_nd_logo">

                                        <div className="cd_company_name inline-block"><p>{data.title}</p></div>
                                        <div className="cd_company_logo ">
                                            <img src={data.company_logo} alt="logo" />
                                        </div>
                                    </div>

                                    <div className="location_type">
                                        <div className="cd_company_type inline-block"><p>{data.type}</p></div>
                                        <div className="cd_company_location inline-right">
                                            <p>{data.location}</p>
                                        </div>
                                    </div>
                                    <button className="btn_submit" onClick={() => this.handleDisplay(this.props.data[index])}>View Details</button>
                                </div>
                            </div>
                        )
                    })
                }</div>

        }
        else {

            displayComponent = <div className="loading"><Loader /></div>
        }

        return (
            <div className="container">
                {displayComponent}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.fetchJobReducer.data,
        loading: state.fetchJobReducer.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        // this dispatch function will dispatch an action which will get the list of jobs
        getJobs: (description, page) => {
            dispatch(actionTypes.fetchJobAction({ description: description }))
        },

        //this dispatch function will dispacth an action to store the data of particular job
        setViewJobDetails: jobdata => {
            dispatch(actionTypes.setViewJobDetails(jobdata))
        }
    }
}

const JobListComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(JobList)


export default JobListComp


// <p className="color-grey">{data.type}</p>