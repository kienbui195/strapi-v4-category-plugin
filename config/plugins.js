module.exports = () => ({
  category: {
    enabled: true,
    resolve: "./src/plugins/category",
    config: {
      maxDepth: 3,
      layouts: {
        categoryItem: {
          link: [
            {
              input: {
                label: "Description",
                name: "description",
                type: "text",
              },
              grid: {
                col: 12,
              },
            },
          ],
        },
      },
    },
  },
});
