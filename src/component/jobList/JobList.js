import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/Actions/FetchJobAction';
import './JobList.css';

class JobList extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            fetchedData: [],
            displayDetails: false
        }
    }

    componentDidMount() {
        this.fetchJobs();
        this.setState({
            fetchedData: this.props.data
        })
        console.log(this.state.fetchedData)
    }

    fetchJobs = () => {
        const { id } = this.props.match.params
        this.props.getJobs(id);
    }

    handleDisplay = (event) => {
        event.target.displayDetails = true
        // this.props.data[index].displayDetails = true
        // console.log(this.props.data[index])
    }
    
    componentDidUpdate(){}
    
    render() {
        console.log(this.props.data)
        return (
            <div className="cards">
                {
                    this.props.data.map((data, index) => {
                        return (
                            <div className="cd" key={index}>
                                <p>{data.title}</p>
                                <p>{data.type}</p>

                                {
                                    data.displayDetails ? (<div>
                                        <p dangerouslySetInnerHTML = {{ __html: data.description }}></p>
                                    </div>) : null
                                }
                                <button onClick={(event) => this.handleDisplay(event)}>View Details</button>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.fetchJobReducer.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getJobs: (description) => {
            dispatch(actionTypes.fetchJobAction(description))
        }
    }
}

const JobListComp = connect(
    mapStateToProps,
    mapDispatchToProps
)(JobList)


export default JobListComp