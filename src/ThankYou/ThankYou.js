import React, { Component } from 'react'
import {
    withRouter
} from 'react-router-dom'

class ThankYou extends Component {
    state = {  }
    
    render() { 
        let data = JSON.parse(sessionStorage.getItem("info"))
        return (
            <div>
                <h1>Thank you atas tiket yang dibeli invoice sudah terkirim ke email {data.email}</h1>
                <ul>
                    <li>Invoice Code: {data.invoiceCode}</li>
                    <li>Name: {data.name}</li>
                    <li>Email: {data.email}</li>
                    <li>Phone Number: {data.phoneNumber}</li>
                    <li>Address: {data.address}</li>
                </ul>
            </div>
        );
    }
}
 
export default withRouter(ThankYou);