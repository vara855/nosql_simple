import React, { Component } from 'react';
import { Form, Button, Table } from 'react-bootstrap'
export default class Projects extends Component {
  constructor(props) {
    super(props);


  }

  render() {
    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label></Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
      </Form>
    )
  }
}