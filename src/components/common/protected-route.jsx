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

import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/auth-service";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth.getCurrentUser()) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
