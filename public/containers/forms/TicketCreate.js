import React, { Component } from 'react';

import RegistryNav from './ChangePages';
import { Form, Button, Table, Container, Row, Label, Col } from 'react-bootstrap'
import Spacer from './Spacer';
import Dropzone from 'react-dropzone'
import axios from 'axios';
import _ from 'lodash';
import getEntities from '../getEntities';

const TYPES = [
  'task', 'bug', 'work item'
];
const COMPONENTS = [
  'POC', 'React', 'Angular', 'Vue', 'Blockchain', 'RDB'
]

export default class CreateTicket extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleUsersSelectChange = this.handleUsersSelectChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onDrop = this.onDrop.bind(this);

    this.state = {
      isLoading: true,
      listUsers: [],
      fileNames: [],
      listProjects: []
    }
  }

  save() {
    const data = this.state;

    return axios({
      method: 'post',
      url: 'http://localhost:5501/api/tickets/create',
      data
    }).then(resp => {
      console.log('resp :', resp);
    }).catch(err => {
      console.log('err :', err);
    })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleUsersSelectChange(e) {
    const { value } = e.target;
    const { _id } = this.state.listUsers.find(user => user.email === value);
    console.log('handleSelectChange :', _id);
    this.setState({ [e.target.name]: _id });
  }

  handleSelectChange(e) {
    const { value } = e.target;
    const { _id } = this.state.listProjects.find(it => it.name === value);
    console.log('handleSelectChange :', _id);
    this.setState({ [e.target.name]: _id });
  }

  handleMultiSelectChange(e) {
    const values = [];
    _.each(e.target.selectedOptions, opt => values.push(opt.value))
    this.setState({ [e.target.name]: values })
  }

  onDrop(acceptedFiles) {
    const self = this;
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      const binnaryString = reader.result;
      self.setState({ attachments: binnaryString })
    }

    acceptedFiles.forEach(file => reader.readAsBinaryString(file))
    this.setState({ fileNames: acceptedFiles.map(it => it.name) })
  }

  componentDidMount() {
    getEntities.getUsers()
      .then(users => {
        this.setState({ listUsers: users })
        return getEntities.getProjects();
      })
      .then(projects => {
        this.setState({ listProjects: projects, isLoading: false });
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
          <Form.Text>Create New Ticket</Form.Text>
          <Row>
            <Col>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control name='name' type='text' onChange={this.handleChange} />
              </Form.Group>

              <Form.Group controlId="reporter">
                <Form.Label>Reporter</Form.Label>
                <Form.Control as='select' name='reporters' onChange={this.handleUsersSelectChange}>
                  {this.state.listUsers.map(it => (<option key={it._id}>{it.email}</option>))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="project">
                <Form.Label>Project</Form.Label>
                <Form.Control as='select' name='project' onChange={this.handleSelectChange}>
                  {this.state.listProjects.map(it => (<option key={it._id}>{it.name}</option>))}
                </Form.Control>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="ticketType">
                <Form.Label>Ticket Type</Form.Label>
                <Form.Control as='select' name='type' onChange={this.handleChange}>
                  {TYPES.map(it => (<option key={it}>{it}</option>))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="assigne">
                <Form.Label>Assigne</Form.Label>
                <Form.Control as='select' name='assigned' onChange={this.handleUsersSelectChange}>
                  {this.state.listUsers.map(it => (<option key={it._id}>{it.email}</option>))}
                </Form.Control>
              </Form.Group>

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
          <Form.Group controlId="Attachments">
            <Form.Label>Attachments: </Form.Label>
            <Dropzone onDrop={acceptedFiles => this.onDrop(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className='dropzone'>  Drag 'n' drop some files here, or click to select files</p>
                  </div>
                  <p>{this.state.fileNames.join(', ')}</p>
                </section>
              )}
            </Dropzone>
          </Form.Group>
          <div className='btn-group-head'>
            <Button type='button' variant='light' onClick={this.save.bind(this)}>Save</Button>
          </div>
        </Form>
      </Container>
    )
  }
};
