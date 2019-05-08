import React from 'react';

import { Menu, Grid, Segment, Header, Form } from 'semantic-ui-react';
import { serializeForm } from '../utils';

import { connect } from 'react-redux';
import { addShipment } from '../reducers/CheeseCo';

const CheeseCoShipments = props => {

  const handleAdd = e => {
    e.preventDefault();
    let formData = serializeForm(e.target);

    console.log(formData);
    props.addShipment(formData);
  }

  return <>
    <Header as='h1' dividing>
      Shipments
        <Header.Subheader>Add and view prepared shipments</Header.Subheader>
    </Header>
    <Grid>
      <Grid.Column width={4}>
        <Menu fluid vertical tabular>
          <Menu.Item name='Add Shipment' active />
          {
            props.shipments && props.shipments.map((shipment, index) => (
              <Menu.Item name={shipment.name} key={index} />
            ))
          }
        </Menu>
      </Grid.Column>

      <Grid.Column stretched width={12}>
        <Segment>
        <Form onSubmit={handleAdd}>
          <Form.Input label='Name' name='name' placeholder='Package Name' required />
          <Form.Input label='ID' name='id' placeholder='Package ID' required />
          <Form.Input label='Price' name='price' />
          <Form.Input label='Quantity' name='quantity' />
          <Form.Input label='Purchase Order' name='po'
            placeholder='Purchase order to fill' />
          <Form.TextArea label='Description' name='description'
            placeholder='Description of the shipment' />
          <Form.Button>Add Shipment</Form.Button>
        </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  </>
}

export default connect(
  (state)=>({ shipments: state.CheeseCo.shipments }),
  { addShipment }
)(CheeseCoShipments);