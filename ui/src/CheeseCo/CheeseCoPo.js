import React from 'react';

import { Container, Form, Input, Label } from 'semantic-ui-react';

const CheeseCoPo = () => {
  return <>
    <Container text>
      In manual mode, Cheese Co. will receive an email / SMS / letter with the requested
        quantity of cheese...
    <hr />
      <Form>
        <Form.Field label='From' control='select'>
          <option>{`Dough Co.`}</option>
          <option>{`Pizza Co.`}</option>
        </Form.Field>
        <Form.Field label='Reference' control='input' />
        <Form.Field>
          <label>Quantity</label>
          <Input type='text' labelPosition='right'>
            <input />
            <Label basic>kg</Label>
          </Input>
        </Form.Field>
        <Form.Field>
          <label>Quantity</label>
          <Input type='text' labelPosition='right'>
            <Label basic>$</Label>
            <input />
            <Label basic>per kg</Label>
          </Input>
        </Form.Field>
        <Form.Button>Submit</Form.Button>
      </Form>

    </Container>
  </>
}

export default CheeseCoPo;