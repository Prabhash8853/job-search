import React from 'react';
import Input from '../input/input';
// import { connect } from 'react-redux'
import * as utility from '../../utility/utility';
import './JobSearch.css';

class JobTitle extends React.Component {

    // setting dynamic inputs which is imported from Input components
    // if you want to add a new input just add similar object shown in the state

    constructor() {
        super();
        this.state = {
            Form: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Enter a Programming Language...'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 1,
                        maxLength: 30
                    },
                    valid: false,
                    touched: false
                },
            },
            formIsValid: false
        }
    }


    

    inputHandler = (e, inputId) => {
        // updating the value, valid, touched property of particular input states having unique key

        const updatedjobElement = utility.updateObject(this.state.Form[inputId], {
            value: e.target.value,
            valid: utility.checkValidity(e.target.value, this.state.Form[inputId].validation),
            touched: true
        });

        // get the input types using inputId and update all the values which is updated above.

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

        // formData.job will have the programming language in which user want to search a job
        // below code will redirect to /job/:id url having that programming language and fetch the data
        this.props.history.push(`/job/${formData.name}`)
    }

    

    render() {


        // associate key values to every input in the state
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
                                touched={jobElement.config.touched}
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