"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

const { UID_MENU_ITEM } = require("../constants");

module.exports = createCoreController(UID_MENU_ITEM, ({ strapi }) => ({
  async search(ctx) {
    const { query } = ctx;
    ctx.body = await strapi
      .plugin("category")
      .service("category-item")
      .search(query);
  },
}));
