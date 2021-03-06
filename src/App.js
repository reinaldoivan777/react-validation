import React, { Component } from 'react';
import Form from './Form/Form.js';
import {
  Route,
  Redirect
} from 'react-router-dom'
import ThankYou from './ThankYou/ThankYou'

class App extends Component {
  render() {
    return (
      <div className="App">    
          <Redirect from='/' to="/form" />
          <Route path="/form" component={Form} />
          <Route path="/thank-you/" component={ThankYou} />
      </div>
    );
  }
}

export default App;
