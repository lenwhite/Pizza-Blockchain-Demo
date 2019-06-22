import React from 'react';

import { Step, Header, Menu, Label, Tab, Placeholder } from 'semantic-ui-react';


const ViewTrack = () => (
  <Tab.Pane>
    <Header as='h2'>Shipment Status</Header>
    <Step.Group ordered size='mini' widths={3}>
      <Step completed>
        <Step.Content>
          <Step.Title>
            Packing
            </Step.Title>
          <Step.Description>
            Pack cheese for delivery
            </Step.Description>
        </Step.Content>
      </Step>

      <Step active>
        <Step.Title >
          Delivery
          </Step.Title>
        <Step.Description>
          Cheese transferred to carrier
          </Step.Description>
      </Step>

      <Step>
        <Step.Title>
          Received
          </Step.Title>
        <Step.Description>
          Cheese received by destination party
          </Step.Description>
      </Step>
    </Step.Group>
    <Header as='h3'>Blockchain Logs</Header>
    <Placeholder fluid>
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder>
    {/*<code>
      Lorem Ipsum
    </code>*/}
  </Tab.Pane>
)

class CheeseCoTrack extends React.Component {

  render() {

    const panes = [
      {
        menuItem: <Menu.Item>50 pounds of Brie
          <Label>5f8e21</Label>
        </Menu.Item>,
        render: () => <ViewTrack />
      },
      {
        menuItem: <Menu.Item>Wagyu-grade Cheddar
          <Label>24e9c9</Label>
        </Menu.Item>,
        render: () => <ViewTrack />
      },
      {
        menuItem: <Menu.Item>Victa's Mozzarella
          <Label>82aq2b</Label>
        </Menu.Item>,
        render: () => <ViewTrack />
      },
    ]

    return <>
      <Header as='h1' dividing>
        Shipment Tracking
        <Header.Subheader>
          Track shipments transferred to other parties
        </Header.Subheader>
      </Header>
      <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
    </>
  }
}

export default CheeseCoTrack;
