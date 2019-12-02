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

import http from "./http-service";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/genres";
export function getGenres() {
  return http.get(apiEndPoint);
}
