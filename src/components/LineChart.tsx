import "chartjs-adapter-moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { HOURS, INTERVAL } from "../constants/constants";
import { Status, ctx } from "../types";
import { assignLabel, getColor, generate } from "../utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export function LineChart() {
  const dataset = generate(HOURS, INTERVAL);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          generateLabels() {
            return [
              { text: Status.ON, fillStyle: getColor(Status.ON), padding: 10 },
              {
                text: Status.OFF,
                fillStyle: getColor(Status.OFF),
                padding: 10,
              },
              {
                text: Status.INVALID,
                fillStyle: getColor(Status.INVALID),
                padding: 10,
              },
            ];
          },
        },
      },
      title: {
        display: true,
        text: "Refrigerator Chart",
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null && context.parsed.x !== null) {
              label = assignLabel(dataset, context.parsed.x, context.parsed.y);
            }
            return label;
          },
        },
      },
    },

    scales: {
      y: {
        ticks: {
          callback: function (value: number | string) {
            return yLabels[Number(value)];
          },
        },
      },
      x: {
        //  type: "time",
        //  time: {
        //     displayFormats: {
        //       hour: "HH:MM:SS",
        //       day: "DD/MM/YYYY",
        //     },
        //  },
      },
    },
  };

  const yLabels: { [key: number]: string } = {
    0: "",
    1: "Light",
    2: "Compressor",
    3: "Fan",
    4: "Status",
  };

  const genericOptions = {
    fill: true,
    lineTension: 0.1,
    pointRadius: 10,
    pointHitRadius: 10,
    pointBorderWidth: 1,
    pointHoverRadius: 5,
  };

  const data = {
    labels: dataset.map((element) => element.timestamp),
    datasets: [
      {
        label: "Status",
        data: dataset.map((element) => element.status.key),
        backgroundColor: dataset.map((element) =>
          getColor(element.status.value)
        ),
        segment: {
          borderColor: (ctx: ctx) =>
            getColor(dataset[ctx.p0.parsed.x].status.value),
        },
        ...genericOptions,
      },
      {
        label: "Fan",
        data: dataset.map((element) => element.fan.key),
        backgroundColor: dataset.map((element) => getColor(element.fan.value)),
        segment: {
          borderColor: (ctx: ctx) =>
            getColor(dataset[ctx.p0.parsed.x].fan.value),
        },
        ...genericOptions,
      },
      {
        label: "Compressor",
        data: dataset.map((element) => element.compressor.key),
        backgroundColor: dataset.map((element) =>
          getColor(element.compressor.value)
        ),
        segment: {
          borderColor: (ctx: ctx) =>
            getColor(dataset[ctx.p0.parsed.x].compressor.value),
        },
        ...genericOptions,
      },
      {
        label: "Light",
        data: dataset.map((element) => element.light.key),
        backgroundColor: dataset.map((element) =>
          getColor(element.light.value)
        ),
        segment: {
          borderColor: (ctx: ctx) =>
            getColor(dataset[ctx.p0.parsed.x].light.value),
        },
        ...genericOptions,
      },
    ],
  };
  return <Line options={options} data={data} height={300} width={1000} />;
}
