import { LogDebug } from "../wailsjs/runtime/runtime";
import { callRPC } from "./rpc";

// TODO: Replace this base64 mess with something more efficient/better
// Base64 in JS/Node is an entire mess of things; see
// https://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string
export function bytesToBase64(bytes: Uint8Array): string {
    return window.btoa(String.fromCharCode.apply(null, Array.from(bytes)));
}

export function base64ToBytes(base64: string): Uint8Array {
    return new Uint8Array(
        window
            .atob(base64)
            .split("")
            .map((c) => c.charCodeAt(0))
    );
}

export function randomBytes(length: number) {
    const arr = new Uint8Array(length);
    return crypto.getRandomValues(arr);
}

export function setImmediate(callback: () => void) {
    setTimeout(callback, 0);
}

export function setRecurring(callback: () => Promise<boolean>, time: number) {
    function recurrence() {
        callback().then((recur) => {
            if (recur) {
                setTimeout(recurrence, time);
            }
        });
    }
    setTimeout(recurrence, time);
}

export function classNames(
    className: string,
    optionals?: { [key: string]: boolean }
) {
    for (const name in optionals) {
        if (optionals[name]) {
            className = className + " " + name;
        }
    }
    return className;
}

declare global {
    interface Console {
        NOCOMMIT(...data: any[]): void;
    }
}

console.NOCOMMIT = (...data: any[]) => {
    console.log(...data);
    LogDebug(JSON.stringify(data));
};

let htmlIdCounter = 0;

export function htmlId(): string {
    htmlIdCounter++;
    return `htmlId-${htmlIdCounter}`;
}

let logsEnabled = false;

export function isDebugLogsEnabled(): boolean {
    return logsEnabled;
}

export function toggleDebugLogs() {
    logsEnabled = !logsEnabled;
    callRPC("setDebugLogs", logsEnabled);
}
