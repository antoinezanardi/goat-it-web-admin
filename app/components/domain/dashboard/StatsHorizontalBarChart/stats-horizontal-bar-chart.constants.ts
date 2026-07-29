const ITEM_HEIGHT = 40;
const MIN_CHART_HEIGHT = 100;

const HORIZONTAL_BAR_CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: "y" as const,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    x: {
      ticks: {
        stepSize: 1,
        precision: 0,
      },
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
} as const;

export {
  HORIZONTAL_BAR_CHART_OPTIONS,
  ITEM_HEIGHT,
  MIN_CHART_HEIGHT,
};