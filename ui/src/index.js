import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.css';
import PizzaCo from './PizzaCo/PizzaCo';
import CheeseCo from './CheeseCo/CheeseCo';


class App extends Component {
  render() {
    return (
      <Router>
        <Helmet>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
          />
        </Helmet>
        <Switch>
          <Route path="/pizza_co" component={PizzaCo} />
          <Route path="/cheese_co" component={CheeseCo} />
          {/* 404 page placeholder*/}
          <Route component={() => <>OOPSIE WOOPSIE!! 
          Uwu We made a fucky wucky!! A wittle fucko boingo! 
          The code monkeys at our headquarters are working VEWY HAWD to fix this!</>} />
        </Switch>
      </Router>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
