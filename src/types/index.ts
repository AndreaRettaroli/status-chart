export type ctx = {
    p0: { parsed: { x: number } };
    p1: { parsed: { x: number } };
};

export type status = "On" | "Off" | "Invalid"

export type dataModel = {
    timestamp: string;
    status: { key: number, value: status };
    fan: { key: number, value: status };
    compressor: { key: number, value: status };
    light: { key: number, value: status };
}

export enum Status {
    ON = "On",
    OFF = "Off",
    INVALID = "Invalid"
}