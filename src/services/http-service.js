/**
 * Movie Rental Application
 *
 * @category   Application_Frontend
 * @package    movie-rental-app
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

/**
 * @category   Application_Frontend
 * @package    movie-rental-app
 */

import axios from "axios";
import { toast } from "react-toastify";
import logger from "./log-service";

// catch unexpected errors
axios.interceptors.response.use(null, error => {
  const expectedException =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedException) {
    logger.log(error);
    toast("An unexpected error occurred!");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  // send default header with http request
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
