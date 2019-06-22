import React from 'react';
import { Grid, Container, Header, Segment, Menu, List } from 'semantic-ui-react';

const Ledger = ({ party }) => (<>
  <Header as='h3' attached='top'>{party.name}Balance</Header>
  <Segment attached>


    <Grid columns={2} divided relaxed>
      <Grid.Column>
        <Grid divided='vertically'>
          <Grid.Row>asdf</Grid.Row>
          <Grid.Row>qwert</Grid.Row>
        </Grid>
        <Menu fluid vertical>
          <Menu.Item className='header'>Dogs</Menu.Item>
          <Menu.Item>Poodle</Menu.Item>
          <Menu.Item>Cockerspaniel</Menu.Item>
        </Menu>
      </Grid.Column>
      <Grid.Column>
        <List celled>
          <List.Item><List.Header>PizzaCoin Balance: 150 PB</List.Header>asdf</List.Item>
          <List.Item>Received 50 PB from Cheese Co.</List.Item>
        </List>
      </Grid.Column>

    </Grid>
  </Segment>

</>);

const Overview = () => (<>
  <Container>
    <Menu secondary>
      <Menu.Item><Header as='h1'>PizzaChain Overview</Header></Menu.Item>
      <Menu.Item position='right'>Powered by EY Blockchain</Menu.Item>
    </Menu>
    <Grid stackable stretched columns={2}>
      <Grid.Row>
        <Grid.Column><Ledger party={{ name: 'Pizza Co.' }} /></Grid.Column>
        <Grid.Column><Ledger party={{ name: 'Truck Co.' }} /></Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column><Ledger party={{ name: 'Cheese Co.' }} /></Grid.Column>
        <Grid.Column><Ledger party={{ name: 'Cheese Co.' }} /></Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
</>);

export default Overview;
