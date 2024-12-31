"use strict";

module.exports = [
  {
    method: "GET",
    path: "/items/info",
    handler: "plugin::category.category-item.find",
    config: {
      policies: [ 'admin::isAuthenticatedAdmin' ],
    },
  },
  {
    method: "GET",
    path: "/items/searchCategories",
    handler: "plugin::category.category-item.search",
    config: {
      policies: [ 'admin::isAuthenticatedAdmin' ],
    },
  },
  {
    method: "GET",
    path: "/items/:id",
    handler: "plugin::category.category-item.findOne",
    config: {
      policies: [ 'admin::isAuthenticatedAdmin' ],
    },
  },
  {
    method: "POST",
    path: "/items",
    handler: "plugin::category.category-item.create",
    config: {
      policies: [ 'admin::isAuthenticatedAdmin' ],
    },
  },
  {
    method: "PUT",
    path: "/items/:id",
    handler: "plugin::category.category-item.update",
    config: {
      policies: [ 'admin::isAuthenticatedAdmin' ],
    },
  },
  {
    method: "DELETE",
    path: "/items/:id",
    handler: "plugin::category.category-item.delete",
    config: {
      policies: [ 'admin::isAuthenticatedAdmin' ],
    },
  },
];
