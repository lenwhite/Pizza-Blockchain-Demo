import React from 'react';

import { Menu, Grid, Segment, Header, Form, Tab, Label } from 'semantic-ui-react';
import { serializeForm } from '../utils';

import { connect } from 'react-redux';
import { addShipment } from '../reducers/CheeseCo';


const AddShipment = props => (
  <Form onSubmit={props.handleAdd}>
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
);

const ViewShipment = ({ shipment }) => (
  <>
    {shipment && Object.entries(shipment).map((entry, index) => (<div key={index}>
      <Header sub>{entry[0]}</Header>
      <span>{entry[1]}</span>
    </div>))}
  </>
)

const CheeseCoShipments = props => {

  const handleAdd = e => {
    e.preventDefault();
    let formData = serializeForm(e.target);

    console.log(formData);
    props.addShipment(formData);
  };

  const panes = [
    {
      menuItem: 'Add Shipment', render: () => <Tab.Pane>
        <AddShipment handleAdd={handleAdd} />
      </Tab.Pane>
    }
  ];

  panes.push(...props.shipments.map((shipment, index) => ({
    menuItem: <Menu.Item key={index}>{shipment.name}<Label>{shipment.id.slice(-6)}</Label></Menu.Item>,
    render: () => <Tab.Pane key={index}>
      <ViewShipment shipment={shipment} />
    </Tab.Pane>
  })));

  return <>
    <Header as='h1' dividing>
      Shipments
        <Header.Subheader>Add and view prepared shipments</Header.Subheader>
    </Header>
    <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
  </>
}

export default connect(
  (state) => ({ shipments: state.CheeseCo.shipments }),
  { addShipment }
)(CheeseCoShipments);