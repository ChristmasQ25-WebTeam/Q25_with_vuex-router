import axios from 'axios';

function pwsend(emaildata){
    const url = 'http://localhost:3001/api/members/pw';
    axios.post(url, emaildata); 
  }
  
  export { pwsend };