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
import Joi from "@hapi/joi";
import Form from "./common/form";
import auth from "../services/auth-service";
import { Redirect } from "react-router-dom";

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  // Validation schema
  schema = {
    username: Joi.string()
      .email()
      .min(5)
      .max(50)
      .required()
      .label("Username"),
    password: Joi.string()
      .min(4)
      .max(10)
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      // login the user
      const { username, password } = this.state.data;
      await auth.login(username, password);

      // redirect user user to the homepage or where they intended to
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    // redirect the user to homepage if already loggedin
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    // render login form
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmission}>
          {this.renderInput("username", "Username", "text", true)}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default Login;
