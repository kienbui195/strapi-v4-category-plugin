"use strict";

module.exports = [
  {
    method: "GET",
    path: "/",
    handler: "plugin::category.category.find",
  },
  {
    method: "GET",
    path: "/:id",
    handler: "plugin::category.category.findOne",
  },
  {
    method: "POST",
    path: "/",
    handler: "plugin::category.category.create",
  },
  {
    method: "PUT",
    path: "/:id",
    handler: "plugin::category.category.update",
  },
  {
    method: "DELETE",
    path: "/:id",
    handler: "plugin::category.category.delete",
  },
];
