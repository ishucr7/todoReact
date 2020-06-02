import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000", //baseURL that depends on REST APIs url that your Server configures.
  headers: {
    "Content-type": "application/json"
  }
});
