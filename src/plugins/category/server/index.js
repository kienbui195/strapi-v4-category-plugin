"use strict";

const config = require("./config");
const contentTypes = require("./content-types");
const controllers = require("./controllers");
const routes = require("./routes");
const services = require("./services");
const destroy = require("./destroy");

module.exports = {
  destroy,
  config,
  contentTypes,
  controllers,
  routes,
  services,
};
