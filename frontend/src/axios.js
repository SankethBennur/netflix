const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://us-central1-netflix-backend-6b798.cloudfunctions/", // should be baseURL
  //   baseURL: "https://netflix-db.herokuapp.com/", // should be baseURL
  // baseURL: "http://localhost:5000/", // should be baseURL
});

module.exports = axiosInstance;
