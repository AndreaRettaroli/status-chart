import { Status, dataModel, status } from "../types";


export function generate(hours: number, interval: number) {
    try {
        const data: dataModel[] = []
        const startTimestamp = new Date();
        startTimestamp.setHours(startTimestamp.getHours() - hours);

        const statusOptions: status[] = [Status.ON, Status.OFF, Status.INVALID];
        const keys = ["light", "compressor", "fan", "status"];

        let currentTimestamp = new Date(startTimestamp);

        while (currentTimestamp <= new Date()) {
            const props: { key: number, value: status }[] = []

            keys.forEach((_: string, index: number) => {
                const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
                props.push({
                    key: index + 1, value: randomStatus
                });
            });

            const element: dataModel = {
                timestamp: currentTimestamp.toLocaleTimeString(),
                status: props[3],
                fan: props[2],
                compressor: props[1],
                light: props[0]
            };

            data.push(element);
            currentTimestamp = new Date(currentTimestamp.getTime() + interval * 1000);
        }

        return data;
    } catch (exception) {
        console.error("FAIL TO GENERATE DATA", exception)
        return []
    }
}

