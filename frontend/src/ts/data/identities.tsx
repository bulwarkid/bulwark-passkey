import { callRPC } from "../core/rpc";
import { base64ToBytes, bytesToBase64, setImmediate } from "../core/util";
import { Identity } from "../../proto/data";
import { LogDebug } from "../wailsjs/runtime/runtime";
import { supabase, supabaseUserId } from "./supabase";
import { LogError } from "../wailsjs/runtime/runtime";
import { RealtimeChannel } from "@supabase/realtime-js";

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

let remoteSubscription_: RealtimeChannel | null = null;

export function listenToRemoteUpdates() {
    const userId = supabaseUserId();
    remoteSubscription_ = supabase
        .channel(`public:vaults:user_id=eq.${userId}`)
        .on(
            "postgres_changes",
            {
                event: "UPDATE",
                schema: "public",
                table: "vaults",
                filter: `user_id=eq.${userId}`,
            },
            (payload) => {
                callRPC(
                    "remoteVaultUpdated",
                    payload.new.data,
                    payload.new.updated_at
                );
            }
        )
        .subscribe();
}

export function unlistenToRemoteUpdates() {
    remoteSubscription_?.unsubscribe();
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

export async function storeRemoteVault(jsonData: string, lastUpdated: string) {
    const userResponse = await supabase.auth.getUser();
    const user = userResponse.data.user;
    if (!user) {
        LogError("No user when trying to save vault to backend");
        return;
    }
    const { error } = await supabase
        .from("vaults")
        .upsert(
            { data: jsonData, user_id: user.id, updated_at: lastUpdated },
            { onConflict: "user_id" }
        )
        .select();
    if (error) {
        LogError(error.message);
        return;
    }
}

export async function fetchRemoteVault(): Promise<[string, string]> {
    const { data, error, status } = await supabase
        .from("vaults")
        .select("data, updated_at");
    if (error || status !== 200) {
        // Request error
        LogDebug(
            "Vault remote fetch error: " + status + " - " + error?.message
        );
        return ["Error", "Error"];
    }
    if (data.length === 0) {
        // No rows matching this user
        LogDebug("No data returned from remote servers for user");
        return ["", ""];
    }
    return [data[0].data, data[0].updated_at];
}
