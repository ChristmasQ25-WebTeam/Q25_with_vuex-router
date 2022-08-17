/* eslint-disable */
import axios from 'axios';

function withdraw(withdrawData){
  const url = 'http://localhost:3001/api/members/withdraw';
  return axios.patch(url, withdrawData);
}

export { withdraw };