import { callRPC } from "../core/rpc";

export async function getFavicon(domain: string): Promise<string | null> {
    return await callRPC("getFavicon", domain);
}
