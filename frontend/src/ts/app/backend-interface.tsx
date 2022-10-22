import { registerHandler } from "../core/rpc";
import * as identities from "../data/identities";
import { LogDebug } from "../wailsjs/runtime/runtime";
import { hideModal, showModal } from "./ModalStack";
import { ApproveActionModal, ClientAction } from "./modals/ApproveAction";
import { requestNewPassphrase } from "./modals/NewVault";
import { requestExistingPassphrase } from "./modals/Unlock";

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

registerHandler("requestExistingPassphrase", requestExistingPassphrase);

registerHandler("requestNewPassphrase", requestNewPassphrase);
