import { registerHandler } from "../core/event-rpc";
import { masterPassword } from "../data/credentials";
import * as identities from "../data/identities";
import { LogDebug } from "../wailsjs/runtime/runtime";
import { hideModal, showModal } from "./ModalContainer";
import { ApproveActionModal, ClientAction } from "./modals/ApproveAction";

const actionStringToAction = new Map([
    ["fido_get_assertion", ClientAction.FIDOGetAssertion],
    ["fido_make_credential", ClientAction.FIDOMakeCredential],
    ["u2f_authenticate", ClientAction.U2FAuthenticate],
    ["u2f_register", ClientAction.U2FRegister],
]);

registerHandler(
    "fido-approveClientAction",
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

registerHandler("get_passphrase", async () => {
    return await masterPassword();
});
