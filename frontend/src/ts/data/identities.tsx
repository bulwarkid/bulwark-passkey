import { callRPC, registerHandler } from "../core/event-rpc";
import { base64ToBytes, setImmediate } from "../core/util";
import { Identity } from "../../proto/data";
import { LogDebug } from "../wailsjs/runtime/runtime";

let identities: Identity[] = [];

let updateCallbackIndex = 0;
let updateCallbacks = new Map<number, (identities: Identity[]) => void>();

export function listenForUpdate(
    callback: (identities: Identity[]) => void
): number {
    updateCallbackIndex++;
    updateCallbacks.set(updateCallbackIndex, callback);
    setImmediate(() => {
        callback(identities);
    });
    return updateCallbackIndex;
}

export function unlistenForUpdate(index: number) {
    updateCallbacks.delete(index);
}

export async function update() {
    LogDebug("Updating identities: " + updateCallbacks);
    identities = await getIdentities();
    updateCallbacks.forEach((callback) => {
        callback(identities);
    });
}

export async function getIdentities(): Promise<Identity[]> {
    const protosRaw = (await callRPC("get_identities")) as string[];
    const identities = [];
    for (const protoRaw of protosRaw) {
        const protoBytes = base64ToBytes(protoRaw); // Wails events converts bytes to base64
        const id = Identity.fromBinary(protoBytes, {
            readUnknownField: "throw",
        });
        identities.push(id);
    }
    return identities;
}

export function deleteIdentity(id: string) {}

registerHandler("update", async () => {
    await update();
});
