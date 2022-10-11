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
