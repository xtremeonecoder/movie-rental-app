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
import TableHeader from "./table-header";
import TableBody from "./table-body";

const Table = ({ items, columns, onSort, sortColumn }) => {
  return (
    <table className="table">
      <TableHeader onSort={onSort} columns={columns} sortColumn={sortColumn} />
      <TableBody items={items} columns={columns} />
    </table>
  );
};

export default Table;
