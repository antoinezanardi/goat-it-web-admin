import { vi } from "vitest";

vi.mock("vue-chartjs", () => ({
  Doughnut: { name: "Doughnut", props: ["data", "options"], template: "<div />" },
  Bar: { name: "Bar", props: ["data", "options"], template: "<div />" },
}));