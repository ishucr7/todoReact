import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api", //baseURL that depends on REST APIs url that your Server configures.
  headers: {
    "Content-type": "application/json"
  }
});
