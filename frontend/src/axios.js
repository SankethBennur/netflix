const axios = require('axios');

const axiosInstance = axios.create({
     baseURL: "http://localhost:5000/"  // should be baseURL
});

module.exports = axiosInstance;