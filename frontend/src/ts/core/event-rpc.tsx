import {
    EventsEmit,
    EventsOn,
    EventsOnce,
    LogDebug,
} from "../wailsjs/runtime/runtime";

export function registerHandler(
    event: string,
    handler: (...data: any) => Promise<any>
) {
    EventsOn(event + "-request", (...data: any) => {
        handler(data).then((responseData) => {
            EventsEmit(event + "-response", responseData);
        });
    });
}

export async function callRPC(name: string, ...data: any): Promise<any> {
    return new Promise<any>((resolve) => {
        EventsOnce(name + "-response", (responseData: any) => {
            resolve(responseData);
        });
        EventsEmit(name + "-request", ...data);
    });
}
