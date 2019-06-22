import React from 'react';

import { Menu, Header, Form, Tab, Label, Button, Modal, Input } from 'semantic-ui-react';
import { serializeForm } from '../utils';

import { connect } from 'react-redux';
import { addCheese, refreshCheeses } from '../reducers/CheeseCo';


const AddShipment = props => (
  <Form onSubmit={props.handleAdd}>
    <Form.Input label='Name' name='name' placeholder='Package Name' required />
    <Form.Input label='ID' name='id' placeholder='Package ID' required />

    <Form.Field>
      <label>Quantity</label>
      <Input type='text' labelPosition='right'>
        <input />
        <Label basic>kg</Label>
      </Input>
    </Form.Field>
    <Form.Field>
      <label>Price</label>
      <Input type='text' labelPosition='left'>
        <Label basic>$</Label>
        <input />
      </Input>
    </Form.Field>

    <Form.Input label='Purchase Order' name='po'
      placeholder='Purchase order to fill' />
    <Form.TextArea label='Description' name='description'
      placeholder='Description of the shipment' />
    <Form.Button>Add Shipment</Form.Button>
  </Form>
);

const ViewShipment = ({ shipment, id }) => (
  <>
    {/* Lazy way of iterating through all properties of the shipment
        for display. TODO: replace with something better
     */}
    <Header>{id}</Header>
    {shipment && Object.entries(shipment).map(([key, value], index) => (value && <div key={index}>
      <Header sub>{key}</Header>
      <p>{value}</p>
    </div>))}

    <Button>Edit</Button>
    <Modal trigger={<Button>Transfer</Button>}>
      <Modal.Header>Select party to transfer shipment to</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Select label='Party' name='transferTo' options={[
            { text: 'Pizza Co.', value: 'Pizza Co.' },
            { text: 'Truck Co.', value: 'Truck Co.' },
            { text: 'Ship Co.', value: 'Ship Co.' },
          ]}>
          </Form.Select>
          <Form.Button>Transfer Shipment</Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
    <Button>Remove</Button>
  </>
)

class CheeseCoShipments extends React.Component {

  componentWillMount() {
    this.props.refreshCheeses();
  }

  render() {

    let props = this.props;

    const handleAdd = e => {
      e.preventDefault();
      let formData = serializeForm(e.target);

      console.log(formData);
      props.addCheese(formData);
    };

    const panes = [
      {
        menuItem: 'Add Shipment', render: () => <Tab.Pane>
          <AddShipment handleAdd={handleAdd} />
        </Tab.Pane>
      }
    ];

    for (let [key, value] of Object.entries(props.shipments)) {
      panes.push({
        menuItem: <Menu.Item key={key}>
          {value.name}<Label>{key.slice(-6)}</Label>
        </Menu.Item>,
        render: () => <Tab.Pane key={key}>
          <ViewShipment shipment={value} id={key} />
        </Tab.Pane>
      });
    }

    return <>
      <Header as='h1' dividing>
        Shipments
          <Header.Subheader>Add and view prepared shipments</Header.Subheader>
      </Header>
      <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
    </>
  }
}

export default connect(
  (state) => ({ shipments: state.CheeseCo.shipments }),
  { addCheese, refreshCheeses }
)(CheeseCoShipments);
