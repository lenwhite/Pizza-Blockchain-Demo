import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import InputGroup from 'react-bootstrap/InputGroup';

const CheeseCoPo = props => {
  return <div className="container">
    In manual mode, Cheese Co. will receive an email / SMS / letter with the requested
    quantity of cheese...
    <hr />
    <Form>
      <Form.Group controlId="formPo">
        <Form.Label>Deliver To</Form.Label>
        <Form.Control as="select" className="mb-3">
          <option>{`Dough Co.`}</option>
          <option>{`Pizza Co.`}</option>
        </Form.Control>
        <Form.Label>Quantity</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control as="input" />
          <InputGroup.Append>
            <InputGroup.Text>kg</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
        <Form.Label>Price</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>$</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control as="input" />
          <InputGroup.Append>
            <InputGroup.Text>per kg</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
        <ButtonToolbar className="justify-content-between">
          <Button variant="primary">Submit</Button>
          <Button variant="secondary">Reset</Button>
        </ButtonToolbar>
      </Form.Group>
    </Form>
  </div>
}

export default CheeseCoPo;