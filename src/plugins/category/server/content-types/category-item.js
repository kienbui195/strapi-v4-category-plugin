"use strict";

module.exports = {
  kind: "collectionType",
  collectionName: "category_items",
  info: {
    displayName: "Category Item",
    singularName: "category-item",
    pluralName: "category-items",
    tableName: "category_items",
  },
  options: {
    draftAndPublish: false,
  },
  pluginOptions: {
    "content-manager": {
      visible: true,
    },
    "content-type-builder": {
      visible: true,
    },
    i18n: {
      localized: true,
    },
  },
  attributes: {
    order: {
      type: "integer",
    },
    title: {
      type: "string",
      required: true,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    root_menu: {
      type: "relation",
      relation: "manyToOne",
      target: "plugin::category.category",
      inversedBy: "items",
      required: true,
    },
    parent: {
      type: "relation",
      relation: "oneToOne",
      target: "plugin::category.category-item",
    },
    url: {
      type: "text",
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
  },
};
