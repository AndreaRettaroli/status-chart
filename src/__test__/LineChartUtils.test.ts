import { expect, describe, it } from 'vitest'
import { assignLabel, getColor } from "../utils";
import { Status, dataModel } from '../types';

describe("assignLabel function", () => {
    const mockDataset: dataModel[] = [
        {
            timestamp: new Date().toDateString(),
            status: { key: 1, value: Status.ON },
            fan: { key: 2, value: Status.INVALID },
            compressor: { key: 3, value: Status.ON },
            light: { key: 4, value: Status.OFF },
        },
    ];

    it("returns the correct status label", () => {
        const x = 0; // Index of the dataset item
        const y = 4; // Corresponding key for status

        const result = assignLabel(mockDataset, x, y);
        expect(result).toBe(Status.ON);
    });

    it("returns the correct fan label", () => {
        const x = 0; // Index of the dataset item
        const y = 3; // Corresponding key for fan

        const result = assignLabel(mockDataset, x, y);
        expect(result).toBe(Status.INVALID);
    });

    it("returns the correct compressor label", () => {
        const x = 0; // Index of the dataset item
        const y = 2; // Corresponding key for compressor

        const result = assignLabel(mockDataset, x, y);
        expect(result).toBe(Status.ON);
    });

    it("returns the correct light label", () => {
        const x = 0; // Index of the dataset item
        const y = 1; // Corresponding key for light

        const result = assignLabel(mockDataset, x, y);
        expect(result).toBe(Status.OFF);
    });

    it("returns the default label for invalid y values", () => {
        const x = 0; // Index of the dataset item
        const y = 0; // Invalid y value

        const result = assignLabel(mockDataset, x, y);
        expect(result).toBe(Status.ON); // Default case should return status
    });
});



describe("getColor function", () => {
    it("returns the correct color for 'On' status", () => {
        const status = Status.ON;
        const result = getColor(status);
        expect(result).toBe("rgb(42, 157, 143)");
    });

    it("returns the correct color for 'Off' status", () => {
        const status = Status.OFF;
        const result = getColor(status);
        expect(result).toBe("rgb(231, 111, 81)");
    });

    it("returns the correct color for 'Invalid' status", () => {
        const status = Status.INVALID;
        const result = getColor(status);
        expect(result).toBe("rgb(142, 202, 230)");
    });

    it("returns the default color for any other status", () => {
        const status = "UnknownStatus";
        const result = getColor(status);
        expect(result).toBe("black");
    });
});