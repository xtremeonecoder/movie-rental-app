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
import { toast } from "react-toastify";
import _ from "lodash";
import { getGenres } from "../services/genre-service";
import { getMovies, deleteMovie } from "../services/movie-service";
import Pagination from "./common/pagination";
import { pagination } from "./utils/pagination";
import ListGroup from "./common/list-group";
import MoviesTable from "./movies-table";
import Search from "./common/search";

class Movies extends Component {
  // Every time when setState function will be called
  // it will change state, and when state will be changed,
  // react will reload the render function.
  state = {
    movies: [],
    genres: [],
    search: "",
    currentPage: 1,
    itemPerPage: 2,
    currentGenre: "all",
    sortColumn: { key: "title", order: "asc" }
  };

  // We will pull the movies and genre data only once
  // If we put these in state, every time onSetState
  // it will pull the movies and genres again and again
  async componentDidMount() {
    // like domready or onload function
    // fetch genres from database
    let { data: genres } = await getGenres();
    genres = [{ _id: "all", name: "All Genres" }, ...genres];

    // fetch movies from database
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async movie => {
    // optimistic method (update frontend first and update backend later)
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    // call backend for deleting
    try {
      await deleteMovie(movie._id);
      toast.success("The movie successfully deleted from database!");
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("The movie has already been deleted!");

      // roll back
      this.setState({ movies: originalMovies });
    }
  };

  handleLikeUnlike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movie.liked;
    this.setState({ movies });
  };

  // we will set only current page and
  // call setState function to execute the script
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  // we will call setState funciton with current genre and
  // new page number for re-executing the script
  handleGenreChange = genre => {
    this.setState({ currentGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = ({ currentTarget: search }) => {
    this.setState({ search: search.value });
  };

  getResult = () => {
    // get movies per genre
    let allMovies = this.state.movies;
    if (this.state.currentGenre !== "all") {
      allMovies = allMovies.filter(
        movie => movie.genre._id === this.state.currentGenre
      );
    }

    // movies search result
    if (this.state.search !== "") {
      allMovies = allMovies.filter(movie =>
        movie.title.toLowerCase().startsWith(this.state.search.toLowerCase())
      );
    }

    // sort data as per table header
    const sortedMovies = _(allMovies).orderBy(
      [this.state.sortColumn.key],
      [this.state.sortColumn.order]
    );

    // get paginated items
    const movies = pagination(
      sortedMovies,
      this.state.currentPage,
      this.state.itemPerPage
    );

    return { movies, totalCount: allMovies.length };
  };

  render() {
    const { user } = this.props;
    const count = this.state.movies.length;
    if (count <= 0) {
      return <h3>There is no movie found!</h3>;
    }

    // get result
    const { movies, totalCount } = this.getResult();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            // defaultPropID="_id"
            // defaultPropName="name"
            currentGenre={this.state.currentGenre}
            onGenreChange={this.handleGenreChange}
          />
        </div>
        <div className="col">
          {user && (
            <Link to="movies/new" className="btn btn-primary">
              Add Movie
            </Link>
          )}
          <h4>There are total {totalCount} movies found!</h4>
          <Search onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            onSort={this.handleSort}
            onDelete={this.handleDelete}
            sortColumn={this.state.sortColumn}
            onLikeUnlike={this.handleLikeUnlike}
          />
          <Pagination
            totalItemCount={totalCount}
            currentPage={this.state.currentPage}
            itemPerPage={this.state.itemPerPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
