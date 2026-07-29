const DOUGHNUT_CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: true,
  cutout: "60%",
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
} as const;

export { DOUGHNUT_CHART_OPTIONS };