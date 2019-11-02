import React from 'react';
import Input from '../input/input';
// import { connect } from 'react-redux'
import * as utility from '../../utility/utility';
import './JobSearch.css';

class JobTitle extends React.Component {

    constructor() {
        super();
        this.state = {
            Form: {
                job: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'jobLanguage',
                        placeholder: 'Search a job in your Language'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                },
            },
            formIsValid: false
        }
    }


    

    inputHandler = (e, inputId) => {
        const updatedjobElement = utility.updateObject(this.state.Form[inputId], {
            value: e.target.value,
            valid: utility.checkValidity(e.target.value, this.state.Form[inputId].validation),
        });

        const updatedForm = utility.updateObject(this.state.Form, {
            [inputId]: updatedjobElement
        });

        let formIsValid = true;
        for (let inputId in updatedForm) {
            formIsValid = updatedForm[inputId].valid && formIsValid;
        }

        this.setState({ Form: updatedForm, formIsValid: formIsValid })
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const formData = {};

        for (let formElementId in this.state.Form) {
            formData[formElementId ] = this.state.Form[formElementId].value;
        }
        this.props.history.push(`/job/${formData.job}`)
    }

    

    render() {

        const jobSearchElementArray = [];
        for (let key in this.state.Form) {
            jobSearchElementArray.push({
                id: key,
                config: this.state.Form
            })
        }

        let jobSearchElements = (
            <form
                className="form_group_job"
                onSubmit={this.onSubmitHandler}
            >
                {
                    jobSearchElementArray.map((jobElement) => {
                        return (
                            <Input
                                className="job_title_inpt"
                                key={jobElement.id}
                                elementType={jobElement.config.elementType}
                                elementConfig={jobElement.config.elementConfig}
                                value={jobElement.config.value}
                                invalid={!jobElement.config.valid}
                                shouldValidate={jobElement.config.validation}
                                changed={(event) => this.inputHandler(event, jobElement.id)}
                            />
                        )
                    })
                }
                <button className = "search_Job">Search a Job</button>
            </form>
        )

        return (
            <div className="jobtitle">
                <div className="jobtitle_input">
                    {jobSearchElements}
                </div>
            </div>
        );
    }
}
export default JobTitle;