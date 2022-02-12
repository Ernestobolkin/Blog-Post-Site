import axios from "axios";

const PORT = process.env.PORT || 8080;

let myUrl = `http://localhost:${PORT}/`;

if (process.env.NODE_ENV === "production") {
  myUrl = "/";
}

console.log(process.env.NODE_ENV);

const myApi = axios.create({
  baseURL: myUrl,
});



export default myApi;