import Axios from "axios";
let apiInstance = Axios.create({
  baseURL: process.env.REACT_APP_API_SVR,
})
const HttpStatus = { OK: 200, }
export { apiInstance, HttpStatus };