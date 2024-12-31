"use strict";

const category = require("./category");
const relations = require("./relations");
const categoryItems = require("./category-item");

module.exports = {
  type: 'admin',
  routes: [...relations, ...category, ...categoryItems],
};
