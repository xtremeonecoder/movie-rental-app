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
import { Redirect } from "react-router-dom";
import auth from "../../services/auth-service";

class Like extends Component {
  //state = {  }

  likeIcon(movie) {
    let className = "fa fa-heart";
    className += !movie.liked ? "-o" : "";
    return className;
  }

  render() {
    // redirect user to login if they are not logged in
    if (!auth.getCurrentUser()) return <Redirect to="/login" />;

    const { movie, onLikeUnlike } = this.props;
    return (
      <i
        style={{ cursor: "pointer", fontSize: "24px" }}
        className={this.likeIcon(movie)}
        aria-hidden="true"
        onClick={() => onLikeUnlike(movie)}
      />
    );
  }
}

export default Like;
