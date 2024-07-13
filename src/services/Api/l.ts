import axios from 'axios';

//To authenticate API requests with the token, you can use Axios interceptors:

//Now, all requests made with instance will include the token in the headers automatically.


const instance = axios.create({
  baseURL: 'https://your-api-url/',
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Assuming you store token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
