import axios from 'axios';

function getUsers() {
  return axios({
    method: 'get',
    url: 'http://localhost:5501/api/users'   
  }).then(resp => {
    return resp.data.map(user => {
      const { _id, email } = user;
      return {
        _id, email
      }
    })
  }).catch(err => {
    console.log('err :', err);
  })
}

function getProjects() {
  return axios({
    method: 'get',
    url: 'http://localhost:5501/api/projects'
  }).then(resp => {
    return resp.data.map(project => {
      const { _id, name, owner } = project;
      return {
        _id, name, owner , project
      }
    })
  }).catch(err => {
    console.log('err :', err);
  })
}

export default {
  getUsers,
  getProjects
}