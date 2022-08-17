/* eslint-disable */
import axios from 'axios';

function registerUser(userData){
  const url = 'http://localhost:3001/api/members/signup';
  return axios.post(url, userData);
}

export { registerUser };