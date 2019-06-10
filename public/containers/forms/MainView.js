import React, { Component } from 'react';

import RegistryNav from './ChangePages';
import { Form, Button, Container, Row, Label, Col } from 'react-bootstrap'
import Spacer from './Spacer';
import Dropzone from 'react-dropzone'
import axios from 'axios';
import getEntities from '../getEntities';
import CreateTicket from './TicketCreate';
import CreateProject from './ProjectCreate';
import Tables from './Table';

export default class MainView extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      isLoading: true,
      isTicketCreation: false,
      isProjectCreation: false,
      isProjectsTable: true,
      listUsers: {}
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

  componentDidMount() {
    this.setState({ isLoading: false })
  }

  render() {
    console.log('this :', this);

    if (this.state.isLoading) {
      return (
        <p>Loading...</p>
      )
    }
    return (
      <div className='wrapper'>
        <RegistryNav></RegistryNav>
        <Spacer></Spacer>
        <Container>
          <div className='btn-group-head'>
            <Button type='button' variant='light' onClick={() => this.setState({ isProcjectsTable: false })} >
              Tickets
            </Button>
            
            <Button type='button' variant='light' onClick={() => this.setState({ isProcjectsTable: true })}>
              Projects
            </Button>
            <Button type='button' variant='light' onClick={() => this.setState({ isProjectCreation: !this.state.isProjectCreation, isTicketCreation: false })}>New Project</Button>

            <Button type='button' variant='light' onClick={() => this.setState({ isTicketCreation: !this.state.isTicketCreation, isProjectCreation: false })}>New Ticket</Button>
          </div>
          <Spacer></Spacer>
          <Tables projectView={this.state.isProjectsTable}></Tables>
        </Container>
        <CreateProject inEdit={this.state.isProjectCreation}></CreateProject>
        <CreateTicket inEdit={this.state.isTicketCreation}>
        </CreateTicket>
      </div>
    )
  }
}