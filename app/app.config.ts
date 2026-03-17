export default defineAppConfig({
  ui: {
    colors: {
      primary: "green",
      neutral: "slate",
    },
    pageHeader: {
      slots: {
        title: "text-xl sm:text-2xl font-medium",
      },
    },
    selectMenu: {
      slots: {
        base: "cursor-pointer",
        item: "cursor-pointer",
      },
    },
    switch: {
      slots: {
        base: "cursor-pointer",
      },
    },
  },
});