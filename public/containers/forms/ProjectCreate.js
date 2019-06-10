import React, { Component } from 'react';

import { Form, Button, Table, Container, Row, Alert, Label, Col } from 'react-bootstrap'
import axios from 'axios';
import getEntities from '../getEntities';
import _ from 'lodash';

const TYPES = [
  'task', 'bug', 'work item'
];
const COMPONENTS = [
  'POC', 'React', 'Angular', 'Vue', 'Blockchain', 'RDB'
]

export default class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this);
    this.handleMultipleUsersChange = this.handleMultipleUsersChange.bind(this);

    this.state = {
      isLoading: true,
      listUsers: [],
      saved: false,
      inError: false
    }
  }

  save() {
    const data = this.state;
    const userJson = localStorage.getItem('user');
    const { _id } = JSON.parse(userJson);

    data.updatedBy = _id;
    data.owner = _id;
    return axios({
      method: 'post',
      url: 'http://localhost:5501/api/projects/create',
      data
    }).then(resp => {
      console.log('resp :', resp);
      this.setState({ saved: true })
      setTimeout(() => {
        this.setState({ saved: false })
      }, 3000);
    }).catch(err => {
      console.log('err :', err);
      this.setState({ inError: err.message })
      setTimeout(() => {
        this.setState({ inError: false })
      }, 3000);
    })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSelectChange(e) {
    const { value } = e.target;
    const { _id } = this.state.listUsers.find(user => user.email === value);

    this.setState({ [e.target.name]: _id });
  }

  handleMultiSelectChange(e) {
    const values = [];
    _.each(e.target.selectedOptions, opt => values.push(opt.value))
    this.setState({ [e.target.name]: values })
  }

  handleMultipleUsersChange(e) {
    const values = [];
    _.each(e.target.selectedOptions, opt => values.push(opt.value))

    this.setState({
      [e.target.name]: values.map(it => {
        return this.state.listUsers.find(user => user.email === it)._id;
      })
    })
  }
  componentDidMount() {
    getEntities.getUsers()
      .then(users => {
        this.setState({ listUsers: users, isLoading: false })
      })
  }

  render() {
    console.log('this :', this);
    if (!this.props.inEdit) {
      return (<div></div>);
    }
    if (this.state.isLoading) {
      return (
        <p>Loading...</p>
      )
    }

    return (
      <Container>
        <Form>
          <Form.Text>Create New Project</Form.Text>
          <Row>
            <Col>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control name='name' type='text' onChange={this.handleChange} />
              </Form.Group>

              <Form.Group controlId="participants">
                <Form.Label>Participants</Form.Label>
                <Form.Control as='select' multiple name='participants' onChange={this.handleMultipleUsersChange}>
                  {this.state.listUsers.map(it => (<option key={it._id}>{it.email}</option>))}
                </Form.Control>
              </Form.Group>

            </Col>

            <Col>
              <Form.Group controlId="Components">
                <Form.Label>Components</Form.Label>
                <Form.Control as='select' multiple name='components' onChange={this.handleMultiSelectChange}>
                  {COMPONENTS.map(it => (<option key={it}>{it}</option>))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="Description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows="3" name='description' onChange={this.handleChange} />
          </Form.Group>

          <div className='btn-group-head'>
            <Button type='button' variant='light' onClick={this.save.bind(this)}>Save</Button>
          </div>
          <Alert
            show={this.state.saved}
            variant='info'>
            Project created!
          </Alert>
          <Alert
            show={!!this.state.inError}
            variant='danger'>
            {this.state.inError}
          </Alert>
        </Form>
      </Container>
    )
  }
};
