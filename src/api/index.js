/* eslint-disable */
import axios from 'axios';

function registerUser(userData){
  const url = 'http://localhost:3001/api/members/signup';
  return axios.post(url, userData);
}

export { registerUser };

function logout(Idx){
  const url = 'http://localhost:3001/api/members/logout';
  let i = {userIdx :  1}
  return axios.delete(url, i);
}

export { logout };