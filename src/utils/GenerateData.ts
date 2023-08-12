interface DataModel {
    timestamp: string;
    status: { key: number, value: string };
    fan: { key: number, value: string };
    compressor: { key: number, value: string };
    light: { key: number, value: string };
}



export function generateData(hours: number, interval: number) {
    const data: DataModel[] = []
    const startTimestamp = new Date();
    startTimestamp.setHours(startTimestamp.getHours() - hours);

    const statusOptions = ["On", "Off", "Invalid"];
    const keys = ["light", "compressor", "fan", "status"];

    let currentTimestamp = new Date(startTimestamp);

    while (currentTimestamp <= new Date()) {
        const props: { key: number, value: string }[] = []

        keys.forEach((_: string, index: number) => {
            const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
            props.push({
                key: index + 1, value: randomStatus
            });
        });

        const element: DataModel = {
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
}

