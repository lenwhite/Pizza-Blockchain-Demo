import React from 'react';

import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import CheeseCoPo from './CheeseCoPo';
import CheeseCoFillPo from './CheeseCoFillPo';
import CheeseCoTrack from './CheeseCoTrack';

const CheeseCo = props => {

  let { match } = props;

  return <>
    <Helmet>
      <title>Cheese Co.</title>
    </Helmet>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Cheese Co.</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mx-auto">
          <LinkContainer to={`${match.url}/po`}>
            <Nav.Link>Add PO</Nav.Link>
          </LinkContainer>
          <LinkContainer to={`${match.url}/mint`}>
            <Nav.Link>Fill PO</Nav.Link>
          </LinkContainer>
          <LinkContainer to={`${match.url}/track`}>
            <Nav.Link>Track PO</Nav.Link>
          </LinkContainer>
          <Nav.Link>Payment</Nav.Link>
        </Nav>
        <Navbar.Text>
          PizzaBucks balance: 0 PB
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
    <Switch>
      <Route path={`${match.url}/po`} component={CheeseCoPo} />
      <Route path={`${match.url}/mint`} component={CheeseCoFillPo} />
      <Route path={`${match.url}/track`} component={CheeseCoTrack} />
    </Switch>
  </>
};

export default CheeseCo;