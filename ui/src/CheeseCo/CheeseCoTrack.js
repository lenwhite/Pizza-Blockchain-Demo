import React, { Component } from 'react';

import { Container, Step } from 'semantic-ui-react';

class CheeseCoTrack extends Component {

  render() {
    return <Container>
      Lorem Ipsum
      <hr />
      <Step.Group ordered size='mini' widths={4}>
        <Step completed>
          <Step.Content>
            <Step.Title>
              Production
            </Step.Title>
            <Step.Description>
              Produce cheese for PO
            </Step.Description>
          </Step.Content>
        </Step>

        <Step active>
          <Step.Title>
            Packing
          </Step.Title>
          <Step.Description>
            Pack cheese for delivery
          </Step.Description>
        </Step>

        <Step>
          <Step.Title>
            Shipping
          </Step.Title>
          <Step.Description>
            Cheese transferred to carrier
          </Step.Description>
        </Step>

        <Step>
          <Step.Title>
            Payment
          </Step.Title>
          <Step.Description>
            Payment received for PO
          </Step.Description>
        </Step>
      </Step.Group>

    </Container>
  }
}

export default CheeseCoTrack;