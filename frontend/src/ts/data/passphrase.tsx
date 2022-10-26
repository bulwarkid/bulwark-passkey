import { callRPC } from "../core/rpc";

// Keep synced with app/data_storage.go
export const LOCAL_VAULT_TYPE = "local";
export const ACCOUNT_VAULT_TYPE = "account";

export function validatePassphrases(
    passphrase1?: string,
    passphrase2?: string,
    oldPassphrase?: string
): string | undefined {
    if (passphrase1 === undefined || passphrase1 === "") {
        // Invalid passphrase
        return "No new passphrase specified.";
    }
    if (passphrase1 !== passphrase2) {
        // Passphrases do not match
        return "Passphrases do not match.";
    }
    if (passphrase1 === oldPassphrase) {
        // Passphrase did not change
        return "Passphrase cannot be the same as the old passphrase.";
    }
    if (passphrase1!.length < 8) {
        // Passphrase is not long enough
        return "Passphrase must be at least 8 characters long.";
    }
    return undefined;
}

let passphrase_: string = "";

export function setPassphrase(passphrase: string) {
    passphrase_ = passphrase;
}

/* Change passphrase for existing vault */
export async function changePassphrase(passphrase: string) {
    passphrase_ = passphrase;
    await callRPC("passphraseChanged");
}

export function getPassphrase(): string | null {
    return passphrase_;
}
