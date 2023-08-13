import { expect, describe, it, vi } from 'vitest'
import { generate } from "../utils/DataGenerator";
import { Status } from "../types";

describe("generate function", () => {
    it("generates data with the correct length", () => {
        const hours = 2;
        const interval = 60; // seconds
        const data = generate(hours, interval);
        const expectedDataLength = (hours * 3600) / interval + 1; // Including the start time

        expect(data).toHaveLength(expectedDataLength);
    });

    it("generates data with valid timestamps", () => {
        const hours = 2;
        const interval = 60; // seconds
        const data = generate(hours, interval);

        for (const entry of data) {
            const timestamp = new Date(entry.timestamp);
            expect(timestamp instanceof Date).toBe(true);
        }
    });

    it("generates data with valid status values", () => {
        const hours = 2;
        const interval = 60; // seconds
        const data = generate(hours, interval);

        for (const entry of data) {
            const { status, fan, compressor, light } = entry;

            const statusOptions = [Status.ON, Status.OFF, Status.INVALID];

            expect(statusOptions).toContain(status.value);
            expect(statusOptions).toContain(fan.value);
            expect(statusOptions).toContain(compressor.value);
            expect(statusOptions).toContain(light.value);
        }
    });


    it("handles exceptions and returns an empty array", () => {
        const mockThrowError = vi.spyOn(global, "Date").mockImplementationOnce(() => { throw new Error("faild to setHour") });

        const result = generate(-1, 0);

        expect(result).toEqual([]);
        expect(mockThrowError).toHaveBeenCalled();
    });
});