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

import _ from "lodash"; // Upgraded version of Underscore Framework

// using lodash
export function pagination(items, currentPage, itemsPerPage) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return _(items)
    .slice(startIndex)
    .take(itemsPerPage)
    .value();
}

// my custom function (working)
// export function pagination(items, currentPage, itemsPerPage) {
//   let index = 0;
//   let pageItems = [];

//   for (
//     let i = (currentPage - 1) * itemsPerPage;
//     i < currentPage * itemsPerPage;
//     i++
//   ) {
//     if (items[i]) {
//       pageItems[index++] = items[i];
//     }
//   }

//   return pageItems;
// }
