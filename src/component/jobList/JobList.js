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
            page: 1
        }
    }

    componentDidMount() {
        
        this.fetchJobs();
        
        this.setState({
            fetchedData: this.props.data
        })
        window.addEventListener("scroll", this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll);
      }
    

    fetchJobs = () => {
        const { id } = this.props.match.params
        this.props.getJobs(id, this.state.page);
    }

    handleDisplay = (jobdata) => {
        this.props.setViewJobDetails(jobdata);
        this.props.history.push(`/job/${jobdata.id}/details`)
    }

    onScroll = () => {
        var scrollTop =
          (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var scrollHeight =
          (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        var clientHeight =
          document.documentElement.clientHeight || window.innerHeight;
        var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    
        if (scrolledToBottom) {
          this.setState({
            page: this.state.page + 1
          });
          this.fetchJobs();
        }
      }


    render() {
        console.log(this.props.data)
        if (!this.props.loading) {
            var displayComponent = displayComponent = <div>
            {
                this.props.data.map((data, index) => {
                    return (
                        <div className="cd" key={index}>
                            <p>{data.title}</p>
                            <p>{data.type}</p>
                            <button onClick={() => this.handleDisplay(this.props.data[index])}>View Details</button>
                        </div>
                    )
                })
            }</div>

        }
        else {

            displayComponent = <div className = "loading"><Loader /></div>
        }

        return (
            <div className="cards">
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
        getJobs: (description, page) => {
            dispatch(actionTypes.fetchJobAction({description: description, page: page}))
        },
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