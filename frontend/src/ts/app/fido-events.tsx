import { registerHandler } from "../core/event-rpc";
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
    (actionString: string, relyingParty?: string, userName?: string) => {
        return new Promise((resolve) => {
            let action = actionStringToAction.get(actionString)!;
            console.assert(
                action != undefined,
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
