// axiosInstance.js
import axios from 'axios';

const axiosAPI= axios.create({
  baseURL: 'http://localhost:8000/api/v1/products',
  // You can set other default configurations here
});

export default axiosAPI;


// actions.js



