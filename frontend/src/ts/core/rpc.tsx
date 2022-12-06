import { EventsEmit, EventsOn, EventsOnce } from "../wailsjs/runtime/runtime";

let rpcResponseId = 0;

export function registerHandler(
    event: string,
    handler: (...data: any) => Promise<any>
) {
    EventsOn(event + "-request", (data: any[]) => {
        const responseId = data[0];
        const args = data.slice(1);
        handler(...args).then((responseData) => {
            EventsEmit("response-backend-" + responseId, responseData);
        });
    });
}

export async function callRPC(name: string, ...data: any): Promise<any> {
    return new Promise<any>((resolve) => {
        const responseId: string = "" + rpcResponseId++;
        EventsOnce("response-frontend-" + responseId, (responseData: any) => {
            resolve(responseData);
        });
        EventsEmit(name + "-request", responseId, ...data);
    });
}
