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
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import auth from "../services/auth-service";

class MoviesTable extends Component {
  columns = [
    {
      key: "title",
      label: "Title",
      content: movie => <Link to={`movies/${movie._id}`}>{movie.title}</Link>
    },
    { key: "genre.name", label: "Genre" },
    { key: "numberInStock", label: "Stock" },
    { key: "dailyRentalRate", label: "Rating" },
    {
      key: "like",
      label: "Like/Unlike",
      content: movie => (
        <Like movie={movie} onLikeUnlike={this.props.onLikeUnlike} />
      )
    },
    {
      key: "delete",
      label: "Action",
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    // remove like/unlike column if user is not logged in
    if (!auth.getCurrentUser()) delete this.columns[this.columns.length - 2];

    // remove delete column if user is not admin
    if (!auth.isAdmin()) delete this.columns[this.columns.length - 1];

    // render table
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        items={movies} // rows
        columns={this.columns} // columns
        onSort={onSort} // click event for sort
        sortColumn={sortColumn} // current sort settings
      />
    );
  }
}

export default MoviesTable;
