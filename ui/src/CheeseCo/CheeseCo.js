import React from 'react';

import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import CheeseCoPo from './CheeseCoPo';

const CheeseCo = props => {

  let { match } = props;

  return <>
    <Helmet>
      <title>Cheese Co.</title>
    </Helmet>
    <Navbar bg="light" expand="md">
      <Navbar.Brand>Cheese Co.</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mx-auto">
          <LinkContainer to={`${match.url}/po`}>
            <Nav.Link>Enter PO</Nav.Link>
          </LinkContainer>
          <Nav.Link>Make Cheese</Nav.Link>
          <Nav.Link>Delivery</Nav.Link>
          <Nav.Link>Payment</Nav.Link>
        </Nav>
        <Navbar.Text>
          PizzaBucks balance: 0 PB
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
    <Switch>
      <Route path={`${match.url}/po`} component={CheeseCoPo} />
    </Switch>
  </>
};

export default CheeseCo;