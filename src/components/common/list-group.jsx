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

class ListGroup extends Component {
  //state = {};

  listClassName(genre) {
    const { currentGenre } = this.props;
    let className = "list-group-item list-group-item-action";
    className += genre === currentGenre ? " active" : "";
    return className;
  }

  render() {
    const { items, onGenreChange, defaultPropID, defaultPropName } = this.props;
    return (
      <ul className="list-group">
        {items.map(item => (
          <a
            key={item[defaultPropID]}
            href="javascript:void(0)"
            onClick={() => onGenreChange(item[defaultPropID])}
            className={this.listClassName(item[defaultPropID])}
          >
            {item[defaultPropName]}
          </a>
        ))}
      </ul>
    );
  }
}

// default properly declaration
ListGroup.defaultProps = {
  defaultPropID: "_id",
  defaultPropName: "name"
};

export default ListGroup;
