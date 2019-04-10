import React, { Component } from 'react';
import { render } from 'react-dom';

import ProgressBar from 'react-bootstrap/ProgressBar';
import Popover from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/Overlay';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import ListGroup from 'react-bootstrap/ListGroup';

class CheeseCoTrack extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <div className="container mt-3">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    <hr />
      <ProgressBar striped now={3/4 * 100} />
      <p />
      <ListGroup>
        <ListGroup.Item variant="success">Prepared for shipping</ListGroup.Item>
        <ListGroup.Item variant="success">In transport</ListGroup.Item>
        <ListGroup.Item variant="success">Delivered</ListGroup.Item>
        <ListGroup.Item>Paid</ListGroup.Item>
      </ListGroup>
    </div>
  }
}

export default CheeseCoTrack;