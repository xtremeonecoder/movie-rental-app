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
import _ from "lodash";

class TableBody extends Component {
  createKey = (item, column) => {
    const { defaultPropID } = this.props;
    return item[defaultPropID] + column.key;
  };

  getCellValue = (item, column) => {
    if (column.content) {
      return column.content(item);
    }

    return _(item).get(column.key);
  };

  render() {
    const { items, columns, defaultPropID } = this.props;

    return (
      <tbody>
        {items.map(item => (
          <tr key={item[defaultPropID]}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.getCellValue(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

TableBody.defaultProps = {
  defaultPropID: "_id"
};

export default TableBody;
