import { hideModal, showModal } from "../app/ModalContainer";
import { UnlockModal } from "../app/modals/Unlock";

let masterPassword_: string | null = null;

export async function masterPassword() {
    if (masterPassword_ == null) {
        masterPassword_ = await requestMasterPassword();
    }
    return masterPassword_;
}

async function requestMasterPassword(): Promise<string> {
    return new Promise<string>((resolve) => {
        showModal(<UnlockModal onUnlock={(passphrase) => {
            hideModal();
            resolve(passphrase);
        }} />);
    });
}
