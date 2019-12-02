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

import jwtDecode from "jwt-decode";
import http from "./http-service";
import { apiUrl } from "../config.json";

const tokenKey = "token";
const apiEndPoint = apiUrl + "/auth";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndPoint, { email, password });

  // store the json web token to local-storage of browser
  // and redirect the user to the home page
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  // store the jwt into the local-storage
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function isAdmin() {
  const user = getCurrentUser();
  if (user && user.isAdmin) return true;
  return false;
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  isAdmin,
  getJwt
};
