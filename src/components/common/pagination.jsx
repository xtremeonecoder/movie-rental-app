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
//import _ from "lodash"; // Upgraded version of Underscore Framework
import PropTypes from "prop-types";

class Pagination extends Component {
  numberOfPage() {
    const { totalItemCount, itemPerPage } = this.props;

    if (itemPerPage <= 0) {
      return [];
    }
    const pages = Math.ceil(totalItemCount / itemPerPage);
    if (pages <= 1) {
      return [];
    }

    // using lodash (working)
    //return _.range(1, pages + 1);

    let numberOfPage = [];
    for (let i = 0; i < pages; i++) {
      numberOfPage[i] = i + 1;
    }

    return numberOfPage;
  }

  activeClass(page) {
    let className = "page-item";
    className += page === this.props.currentPage ? " active" : "";
    return className;
  }

  render() {
    const { onPageChange } = this.props;
    return (
      <nav>
        <ul className="pagination">
          {this.numberOfPage().map(page => (
            <li key={page} className={this.activeClass(page)}>
              <a
                onClick={() => onPageChange(page)}
                className="page-link"
                href="javascript:void(0)"
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

// PropTypes declaration for warning
Pagination.propTypes = {
  totalItemCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
