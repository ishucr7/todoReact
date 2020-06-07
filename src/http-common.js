import axios from "axios";

export default axios.create({
  baseURL: "https://todo-api-52371.herokuapp.com", //baseURL that depends on REST APIs url that your Server configures.
  headers: {
    "Content-type": "application/json"
  }
});
