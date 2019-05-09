import React from 'react';

import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';

import { Menu, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import CheeseCoTrack from './CheeseCoTrack';
import CheeseCoInventory from './CheeseCoShipments';

const CheeseCo = props => {

  let { match } = props;

  return <>
    <Helmet>
      <title>Cheese Co.</title>
    </Helmet>
    <Container>
      <Menu stackable>
        <Menu.Item header>Cheese Co.</Menu.Item>
        <Menu.Item name='Shipments' as={NavLink} to={`${match.url}/shipments`} />
        <Menu.Item name='Tracking' as={NavLink} to={`${match.url}/track`} />
        <Menu.Item name='Payment' />
        <Menu.Item name='Orders' />
        <Menu.Item position='right'>PizzaBucks balance: 0 PB</Menu.Item>
      </Menu>
      <Switch>
        <Route path={`${match.url}/shipments`} component={CheeseCoInventory} />
        <Route path={`${match.url}/track`} component={CheeseCoTrack} />
      </Switch>
    </Container>


  </>
};

export default CheeseCo;