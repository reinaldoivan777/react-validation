import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import '../css/style.css';
import {
    withRouter
} from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import data from '../Data/CountryCode.json'

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            countryCode: '+62', //phone secara default akan memiliki country code +62
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
        this.handleCountryCode = this.handleCountryCode.bind(this)
        this.randomString = this.randomString.bind(this)
    }

    handleCountryCode(e) {
        this.setState({
            countryCode: e.target.value
        })
    }

    handleUserInput(e) {
        const name = e.target.name
        const value = e.target.value
        
        
        this.setState({
            [name]: value
        }, () => { this.validateField(name, value) })
        
    }

    //validasi form field
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

    //bikin random code invoice
    randomString(length, char) {
        let result = ''
        for(let i = length; i > 0; --i)
            result += char[Math.floor(Math.random() * char.length)]
        return result
    }

    submitForm(e){
        e.preventDefault()
        let iCode = this.randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
        
        let data = {
            name: this.state.name,
            email: this.state.email,
            phoneNumber: this.state.countryCode + this.state.phoneNumber,
            address: this.state.address,
            subsNewsletter: this.state.subsNewsletter,
            invoiceCode: iCode
        }
        sessionStorage.setItem("info", JSON.stringify(data))
        this.props.history.push(`/thank-you/?info`)
    }

    render() {
        const countryCodeOptions = data.map((countryCode) => {
            return <option value={countryCode.dial_code}>{`${countryCode.name} (${countryCode.dial_code})`}</option>
        })

        return (
            <Row className="show-grid">
                <Col md={3}></Col>
                <Col xs={12} md={6}>
                    <form onSubmit={this.submitForm.bind(this)}>
                        <h2>Buy Ticket</h2>
                        <div className="panel panel-default">
                            <FormErrors formErrors={this.state.formErrors} />
                        </div>
                        <div className={`form-group ${this.errorClass(this.state.formErrors.name)}`}>
                            <label htmlFor="name">Name <span className="required">*</span></label>
                            <input type="text" className="form-control" name="name" placeholder="Your Name" value={this.state.name} onChange={(event) => this.handleUserInput(event)} />
                        </div>
                        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                            <label htmlFor="email">Email <span className="required">*</span></label>
                            <input type="email" className="form-control" name="email" placeholder="Email" value={this.state.email} onChange={(event) => this.handleUserInput(event)} />
                        </div>
                        
                        <div className={`form-group ${this.errorClass(this.state.formErrors.phone)}`}>
                            <label htmlFor="phoneNumber">Phone Number <span className="required">*</span></label>
                            <select name="CountryCode" className="form-control"  onChange={this.handleCountryCode}>
                                <option value="">Select Country Code</option>
                                {countryCodeOptions}
                            </select>
                            <input type="number" className="phone" name="phoneNumber" placeholder="Phone Number" value={this.state.phoneNumber} onChange={(event) => this.handleUserInput(event)} />
                        </div>
                        <div className={`form-group`}>
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control" name="address" placeholder="Address" value={this.state.address} maxLength="130" onChange={(event) => this.handleUserInput(event)} />
                        </div>
                        <div className="form-group">
                            <input type="checkbox" id="subsNewsletter" checked />
                            <label class="form-check-label" for="subsNewsletter">Subscribe Newsletter</label>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Submit</button>
                    </form>
                </Col>
            </Row>
            
        )
    }
} 

export default withRouter(Form);