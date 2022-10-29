import { callRPC } from "../core/rpc";
import { base64ToBytes, bytesToBase64, setImmediate } from "../core/util";
import { Identity } from "../../proto/data";
import { LogDebug } from "../wailsjs/runtime/runtime";
import { supabase } from "../core/supabase";
import { LogError } from "../wailsjs/runtime/runtime";

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
    const protosRaw = (await callRPC("getIdentities")) as string[];
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

export async function deleteIdentity(id: Uint8Array) {
    return await callRPC("deleteIdentity", bytesToBase64(id));
}

export async function storeRemoteVault(jsonData: string) {
    const userResponse = await supabase.auth.getUser();
    const user = userResponse.data.user;
    if (!user) {
        LogError("No user when trying to save vault to backend");
        return;
    }
    const { error } = await supabase
        .from("vaults")
        .upsert({ data: jsonData, user_id: user.id });
    if (error) {
        LogError(error.message);
        return;
    }
}

export async function fetchRemoteVault(): Promise<string> {
    const { data, error, status, statusText } = await supabase
        .from("vaults")
        .select("data");
    if (error || data.length === 0) {
        // TODO: Handle error
        LogDebug(error ? error.message : "No data returned from remote fetch");
        return "";
    }
    return data[0].data;
}
