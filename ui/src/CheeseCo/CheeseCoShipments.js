import React from 'react';

import { Container, Menu, Grid, Segment, Header } from 'semantic-ui-react';

const CheeseCoInventory = () => {
  return <>
    <Header as='h1' dividing>
      Shipments
        <Header.Subheader>Add and view prepared shipments</Header.Subheader>
    </Header>
    <Grid>
      <Grid.Column width={4}>
        <Menu fluid vertical tabular>
          <Menu.Item name='bio' active />
          <Menu.Item name='pics' />
          <Menu.Item
            name='companies'
          />
          <Menu.Item name='Add Shipment' />
        </Menu>
      </Grid.Column>

      <Grid.Column stretched width={12}>
        <Segment>
          This is an stretched grid column. This segment will always match the tab height
          </Segment>
      </Grid.Column>
    </Grid>
  </>
}

export default CheeseCoInventory;