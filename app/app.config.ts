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
    input: {
      slots: {
        base: "placeholder:italic placeholder:text-xs placeholder:text-ellipsis placeholder:overflow-hidden",
      },
    },
    textarea: {
      slots: {
        base: "placeholder:italic placeholder:text-xs",
      },
    },
    inputTags: {
      slots: {
        input: "placeholder:italic placeholder:text-xs placeholder:text-ellipsis placeholder:overflow-hidden",
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