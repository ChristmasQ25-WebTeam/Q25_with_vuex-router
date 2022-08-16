/* eslint-disable */
import axios from 'axios';

function changePw(pwData){
  const url = 'http://localhost:3001/api/members/newpw';
  return axios.patch(url, pwData);
}

export { changePw };