import React, { Component } from 'react';
import './App.css';
import Form from './Form.js';
import { Row, Col } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Row className="show-grid">
          <Col xs={12} md={12}>
            <Form />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
