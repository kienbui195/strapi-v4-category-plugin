"use strict";

const category = require("./category");
const categoryItem = require("./category-item");

module.exports = {
  type: "content-api",
  routes: [...category, ...categoryItem],
};
