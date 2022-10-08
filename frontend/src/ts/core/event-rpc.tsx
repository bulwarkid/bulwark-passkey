import { LogPrint } from "../wailsjs/runtime/runtime";
import { EventsEmit, EventsOn } from "../wailsjs/runtime/runtime";

export function registerHandler(
    event: string,
    handler: (...data: any) => Promise<any>
) {
    EventsOn(event + "-request", (...data: any) => {
        LogPrint("Received " + event)
        handler(data).then((responseData) => {
            LogPrint("Sending " + event)
            EventsEmit(event + "-response", responseData);
        });
    });
}
