'use strict';

const category = require('./category');
const categoryItem = require('./category-item');
const plugin = require('./plugin');
const uid = require('./uid');

module.exports = {
  'category': category,
  'category-item': categoryItem,
  plugin,
  uid,
};
