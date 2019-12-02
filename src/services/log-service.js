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

//import Raven from "raven-js";
//import * as Sentry from "@sentry/browser";

function init() {
  //   // Error Loging: Using Sentry-Browser SDK
  //   // Error will be found on sentry.io after login
  //   Sentry.init({
  //     dsn: "https://8033ca06d5aa44cf9d52a07b34cd5186@sentry.io/1493605"
  //   });
  //Error Logging: Using Raven-JS - Sentry SDK
  //Error will be found on sentry.io after login
  //   Raven.config("https://8033ca06d5aa44cf9d52a07b34cd5186@sentry.io/1493605", {
  //     release: "1-0-0",
  //     environment: "development-test"
  //   }).install();
}

function log(error) {
  console.log(error);
  //Sentry.captureException(error); // capturing exception using Sentry-Browser SDK
  //Raven.captureException(error); // capturing exception using Sentry SDK (Raven-JS)
}

export default {
  init,
  log
};
