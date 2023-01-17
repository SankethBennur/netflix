const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://us-central1-netflix-backend-6b798.cloudfunctions.net/app", // should be baseURL
});

module.exports = axiosInstance;
