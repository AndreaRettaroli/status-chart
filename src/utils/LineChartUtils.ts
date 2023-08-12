import { dataModel, status } from "../types";

export const assignLabel = (dataset: dataModel[], x: number, y: number): string => {
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

export const getColor = (status: status): string => {
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