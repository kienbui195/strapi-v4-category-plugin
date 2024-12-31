'use strict';

module.exports = [
  {
    method: 'GET',
    path: '/config',
    handler: 'plugin::category.category.config',
    config: {
      policies: [ 'admin::isAuthenticatedAdmin' ],
    },
  },
  {
    method: 'GET',
    path: '/',
    handler: 'plugin::category.category.find',
    config: {
      policies: [ 'admin::isAuthenticatedAdmin' ],
    },
  },
  {
    method: 'GET',
    path: '/:id',
    handler: 'plugin::category.category.findOne',
    config: {
      policies: [ 'admin::isAuthenticatedAdmin' ],
    },
  },
  {
    method: 'POST',
    path: '/',
    handler: 'plugin::category.category.create',
    config: {
      policies: [ 'admin::isAuthenticatedAdmin' ],
    },
  },
  {
    method: 'PUT',
    path: '/:id',
    handler: 'plugin::category.category.update',
    config: {
      policies: [ 'admin::isAuthenticatedAdmin' ],
    },
  },
  {
    method: 'DELETE',
    path: '/:id',
    handler: 'plugin::category.category.delete',
    config: {
      policies: [ 'admin::isAuthenticatedAdmin' ],
    },
  },
];
