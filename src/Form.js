import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import './Form.css';

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            phoneNumber: '',
            address:'',
            subsNewsletter: true,
            password: '',
            formErrors: {
                name: '',
                email: '',
                phone: '',
                password: '',
            },
            nameValid: false,
            emailValid: false,
            phoneValid: false,
            passwordValid: false,
            formValid: false
        }
    }

    handleUserInput(e) {
        const name = e.target.name
        const value = e.target.value 
        this.setState({
            [name]: value
        }, () => { this.validateField(name, value) })
    }

    validateField(fieldName, value){
        let fieldValidationErrors = this.state.formErrors
        let nameValid = this.state.nameValid
        let emailValid = this.state.emailValid
        let phoneValid = this.state.phoneValid
        let passwordValid = this.state.passwordValid

        switch(fieldName) {
            case 'name': 
                nameValid = value.length >= 5
                fieldValidationErrors.name = nameValid ? '' : ' Minimum 5 characters'
                break
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
                fieldValidationErrors.email = emailValid ? '' : ' is invalid'
                break
            case 'phoneNumber':
                phoneValid = value.length > 0
                fieldValidationErrors.phoneNumber = phoneValid ? '' : ' wajib isi'
                break
            case 'password':
                passwordValid =  value.length >= 6
                fieldValidationErrors.password = passwordValid ? '' : ' is too short'
                break
            default:
                break
        }
        this.setState({
            formErrors: fieldValidationErrors,
            nameValid: nameValid,
            emailValid: emailValid,
            phoneValid: phoneValid,
            passwordValid: passwordValid
        }, this.validateForm)
    }

    validateForm() {
        this.setState({
            formValid: this.state.nameValid && this.state.emailValid && this.state.phoneValid
        })
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has error')
    }

    render() {
        return (
            <form>
                <h2>Buy Ticket</h2>
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.name)}`}>
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="name" placeholder="Your Name" value={this.state.name} onChange={(event) => this.handleUserInput(event)} />
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" className="form-control" name="email" placeholder="Email" value={this.state.email} onChange={(event) => this.handleUserInput(event)} />
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.phone)}`}>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="number" className="form-control" name="phoneNumber" placeholder="Phone Number" value={this.state.phoneNumber} onChange={(event) => this.handleUserInput(event)} />
                </div>
                <div className={`form-group`}>
                    <label htmlFor="address">Address</label>
                    <input type="text" className="form-control" name="address" placeholder="Address" value={this.state.address} maxLength="130" onChange={(event) => this.handleUserInput(event)} />
                </div>
                <div className="form-group">
                    <input type="checkbox" id="subsNewsletter" checked />
                    <label class="form-check-label" for="subsNewsletter">Subscribe Newsletter</label>
                </div>
                <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Sign Up</button>
            </form>
        )
    }
} 

export default Form;