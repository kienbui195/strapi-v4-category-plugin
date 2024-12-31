'use strict';

const category = require( './category' );
const categoryItem = require( './category-item' );

module.exports = {
  'category': { schema: category },
  'category-item': { schema: categoryItem },
};
