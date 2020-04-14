import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://boardgames-table.firebaseio.com/'
});

export default instance;
