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

class TableHeader extends Component {
  raiseSort = key => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.key === key) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.key = key;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th
              key={column.key}
              onClick={() => this.raiseSort(column.key)}
              className="clickable"
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
