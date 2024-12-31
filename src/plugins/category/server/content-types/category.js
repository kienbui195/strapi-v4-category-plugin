"use strict";

module.exports = {
  kind: "collectionType",
  collectionName: "category",
  info: {
    displayName: "Category",
    singularName: "category",
    pluralName: "categories",
    tableName: "categories",
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
    title: {
      type: "string",
      required: true,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    slug: {
      type: "uid",
      targetField: "title",
      required: true,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    items: {
      type: "relation",
      relation: "oneToMany",
      target: "plugin::category.category-item",
      mappedBy: "root_menu",
    },
  },
};
