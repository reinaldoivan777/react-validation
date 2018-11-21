import React, { Component } from 'react'
import {
    withRouter
} from 'react-router-dom'
import '../css/style.css'
import { Row, Col } from 'react-bootstrap'

class ThankYou extends Component {
    state = {  }
    
    render() { 
        let data = JSON.parse(sessionStorage.getItem("info"))
        return (
            <div className="container">
                <h1 className="thankYou">THANK YOU!</h1>
                <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                <p className="thankYou"> Invoice tiket yang dibeli sudah terkirim ke email {data.email}</p>
                <h4 className="thankYou">INFORMATION DETAIL</h4>
                <Row className="show-grid">
                    <Col xs={2} md={3}></Col>
                    <Col xs={8} md={6}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" className="invoice">Invoice Code</th>
                                    <th scope="col" className="invoice">{data.invoiceCode}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>{data.name}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{data.email}</td>
                                </tr>
                                <tr>
                                    <td>Phone Number</td>
                                    <td>{data.phoneNumber}</td>
                                </tr>
                                {
                                    (data.address !== "") ? (
                                        <tr>
                                            <td>Address</td>
                                            <td>{data.address}</td>
                                        </tr>
                                    ) : ""
                                }
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </div>
        );
    }
}
 
export default withRouter(ThankYou);