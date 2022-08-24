import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;
console.log(baseURL);

const instance = axios.create({
  baseURL,
  timeout: 3000,
});

export default instance;
