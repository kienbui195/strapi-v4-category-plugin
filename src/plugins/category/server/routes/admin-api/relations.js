'use strict';

module.exports = [
  {
    method: 'GET',
    path: '/relations/:model/:targetField',
    handler: 'plugin::category.relations.findAvailable',
    config: {
      policies: [ 'admin::isAuthenticatedAdmin' ],
    },
  },
  {
    method: 'GET',
    path: '/relations/:model/:id/:targetField',
    handler: 'plugin::category.relations.findExisting',
    config: {
      policies: [ 'admin::isAuthenticatedAdmin' ],
    },
  },
];
