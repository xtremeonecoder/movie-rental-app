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

const Search = ({ onChange }) => {
  return (
    <div className="form-group">
      <input
        name="key"
        placeholder="Search..."
        onChange={onChange}
        type="text"
        className="form-control"
      />
    </div>
  );
};

export default Search;
