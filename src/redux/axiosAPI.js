// axiosInstance.js
import axios from 'axios';

const axiosAPI= axios.create({
  baseURL: 'https://backend-admin-nu.vercel.app/api/v1/products',
  // You can set other default configurations here
});

export default axiosAPI;


// actions.js



