import { registerHandler } from "../core/rpc";
import * as identities from "../data/identities";
import { LogDebug } from "../wailsjs/runtime/runtime";
import { hideModal, showModal } from "./ModalStack";
import { ApproveActionModal, ClientAction } from "./modals/ApproveAction";
import { createNewVault } from "./signup/CreateAccount";
import {
    ACCOUNT_VAULT_TYPE,
    getPassphrase,
    LOCAL_VAULT_TYPE,
} from "../data/passphrase";
import { unlockLocalVault } from "./modals/Unlock";
import { LogError } from "../wailsjs/runtime/runtime";

const actionStringToAction = new Map([
    ["fido_get_assertion", ClientAction.FIDOGetAssertion],
    ["fido_make_credential", ClientAction.FIDOMakeCredential],
    ["u2f_authenticate", ClientAction.U2FAuthenticate],
    ["u2f_register", ClientAction.U2FRegister],
]);

registerHandler(
    "approveClientAction",
    (
        requestData: [
            actionString: string,
            relyingParty?: string,
            userName?: string
        ]
    ) => {
        return new Promise((resolve) => {
            const [actionString, relyingParty, userName] = requestData;
            let action = actionStringToAction.get(actionString)!;
            LogDebug(JSON.stringify(actionString));
            console.assert(
                action !== undefined,
                "Undefined client action: " + actionString
            );
            const onResponse = (approved: boolean) => {
                hideModal();
                resolve(approved);
            };
            showModal(
                <ApproveActionModal
                    action={action}
                    relyingParty={relyingParty}
                    userName={userName}
                    onResponse={onResponse}
                />
            );
        });
    }
);

registerHandler("update", async () => {
    await identities.update();
});

registerHandler("logIn", async (vaultType: string) => {
    if (vaultType === LOCAL_VAULT_TYPE) {
        return await unlockLocalVault();
    } else if (vaultType === ACCOUNT_VAULT_TYPE) {
        // TODO: Log in
        return true;
    } else {
        LogError("Invalid vault type: " + vaultType);
    }
});

registerHandler("createNewVault", createNewVault);

registerHandler("getPassphrase", async () => {
    return getPassphrase() || "";
});
