export default defineAppConfig({
  ui: {
    colors: {
      primary: "green",
      neutral: "slate",
    },
    button: {
      slots: {
        base: ["cursor-pointer"],
      },
    },
    inputTags: {
      slots: {
        itemDelete: "cursor-pointer",
      },
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
    select: {
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