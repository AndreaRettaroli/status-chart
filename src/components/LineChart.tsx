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
import { generate } from "../utils/DataGenerator";
import { HOURS, INTERVAL } from "../constants/constants";

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

type ctx = {
  p0: { parsed: { x: number } };
  p1: { parsed: { x: number } };
};

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
              { text: "On", fillStyle: getColor("On"), padding: 10 },
              { text: "Off", fillStyle: getColor("Off"), padding: 10 },
              { text: "Invalid", fillStyle: getColor("Invalid"), padding: 10 },
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
              label = assignLabel(context.parsed.x, context.parsed.y);
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

  const assignLabel = (x: number, y: number): string => {
    switch (y) {
      case 4:
        return dataset[x].status.value;
      case 3:
        return dataset[x].fan.value;
      case 2:
        return dataset[x].compressor.value;
      case 1:
        return dataset[x].light.value;
      default:
        return dataset[x].status.value;
    }
  };

  const getColor = (status: string): string => {
    switch (status) {
      case "On":
        return "rgb(42, 157, 143)";
      case "Off":
        return "rgb(231, 111, 81)";
      case "Invalid":
        return "rgb(142, 202, 230)";
      default:
        return "black"; // Default color for any other status
    }
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
        label: "status",
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
