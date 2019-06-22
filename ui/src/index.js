import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';

import 'semantic-ui-css/semantic.min.css';

import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.css';
import PizzaCo from './PizzaCo/PizzaCo';
import CheeseCo from './CheeseCo/CheeseCo';
import Overview from './Overview/Overview';



class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Helmet>

          </Helmet>
          <Switch>
            <Route path='/' exact component={Overview} />
            <Route path='/pizza_co' component={PizzaCo} />
            <Route path='/cheese_co' component={CheeseCo} />
            {/* 404 page placeholder*/}
            <Route component={() => <>OOPSIE WOOPSIE!!
            Uwu We made a fucky wucky!! A wittle fucko boingo!
          The code monkeys at our headquarters are working VEWY HAWD to fix this!</>} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
