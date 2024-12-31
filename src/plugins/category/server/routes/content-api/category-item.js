"use strict";

module.exports = [
  {
    method: "GET",
    path: "/items/info",
    handler: "plugin::category.category-item.find",
  },
  {
    method: "GET",
    path: "/items/searchCategories",
    handler: "plugin::category.category-item.search",
  },
  {
    method: "GET",
    path: "/items/:id",
    handler: "plugin::category.category-item.findOne",
  },
  {
    method: "POST",
    path: "/items",
    handler: "plugin::category.category-item.create",
  },
  {
    method: "PUT",
    path: "/items/:id",
    handler: "plugin::category.category-item.update",
  },
  {
    method: "DELETE",
    path: "/items/:id",
    handler: "plugin::category.category-item.delete",
  },
];
