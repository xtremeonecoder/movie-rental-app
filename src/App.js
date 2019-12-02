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

import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import MainMenu from "./components/main-menu";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/not-found";
import MovieDetails from "./components/movie-details";
import Login from "./components/login";
import Logout from "./components/logout";
import Register from "./components/register";
import AddMovie from "./components/add-movie";
import ProtectedRoute from "./components/common/protected-route";
import auth from "./services/auth-service";
//import logo from "./logo.svg";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const user = this.state.user;
    return (
      <main className="container">
        <ToastContainer />
        <MainMenu user={user} />

        <div className="content">
          <Switch>
            <ProtectedRoute path="/movies/new" component={AddMovie} />
            <ProtectedRoute path="/movies/:id" component={MovieDetails} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Route
              path="/movies"
              exact
              render={props => <Movies {...props} user={user} />}
            />
            <Redirect from="/" to="/movies" exact />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </main>
    );
  }
}

export default App;
