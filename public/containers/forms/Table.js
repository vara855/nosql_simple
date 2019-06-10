import React, { Component } from 'react';
import { Form, Button, Table, Container, Row, Label, Col } from 'react-bootstrap';
import getEntities from '../getEntities';

export default class Tables extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    }
  }

  async componentDidMount() {
    if (this.props.projectView) {
      const projects = await getEntities.getProjects();
      this.setState({ projects: projects.map(it => it.project) });
    }
    this.setState({ isLoading: false })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <p>Loading...</p>
      )
    }

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Project Name</th>
            <th>Participants</th>
            <th>Description</th>
            <th>Components</th>
          </tr>
        </thead>
        <tbody>
          {this.state.projects.map(proj => {
            console.log('proj :', proj);
            return (
              <tr>
                <td>{proj._id}</td>
                <td>{proj.name}</td>
                <td>{proj.participants.join(', ')}</td>
                <td>{proj.description}</td>
                <td>{proj.components.join(', ')}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }
}
