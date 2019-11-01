import React from 'react';
import './Modal.css';
import Input from '../input/input';
import * as Utility from '../../utility/utility';

class Modal extends React.Component {

    constructor() {
        super();
        this.state = {
            Form: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Name'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 3,
                        maxLength: 30
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'example@gmail.com'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false
                },
                coverLetter: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'textarea',
                        placeholder: 'write your cover letter note'
                    },
                    value: '',
                    touched: false
                },
            },
            formIsValid: false,
            selectedFile: null
        }
    }

    inputHandler = (e, inputId) => {

        const updatedFormElement = Utility.updateObject(this.state.Form[inputId], {
            value: e.target.value,
            valid: Utility.checkValidity(e.target.value, this.state.Form[inputId].validation),
            touched: true
        });

        const updatedForm = Utility.updateObject(this.state.Form, {
            [inputId]: updatedFormElement
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
            formData[formElementId] = this.state.Form[formElementId].value;
        }
        this.props.getLoginUser(formData);
    }

    onFileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    render() {
        
        const formElementArray = [];
        for (let key in this.state.Form) {
            formElementArray.push({
                id: key,
                config: this.state.Form[key]
            });
        }

        let formElements = (
            <form className="form-group_mb"
                onSubmit={this.onSubmitHandler}
            >
                {formElementArray.map((formElement) => {
                    return (
                        <Input
                            className="input_lgn_modal"
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputHandler(event, formElement.id)}
                        />

                    )
                })}
                <input type="file" name="file" onChange={(e) => this.onFileChange(e)} />
                <button className="btn_submit">Submit</button>
            </form>
        )

        return (
            <div>
                <div className="Backdrop" onClick={this.props.BackdropClicked}></div>
                <div className={this.props.show ? 'Modal' : "Modal-hide"}>
                    {formElements}
                </div>
            </div>
        )
    }
}

export default Modal;