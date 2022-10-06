import { assert } from "console";
import { showModal } from "../app/ModalContainer";
import { ApproveActionModal, ClientAction } from "../app/modals/ApproveAction";
import { EventsOn } from "../wailsjs/runtime/runtime";

const actionStringToAction = new Map([
    ["fido_get_assertion", ClientAction.FIDOGetAssertion],
    ["fido_make_credential", ClientAction.FIDOMakeCredential],
    ["u2f_authenticate", ClientAction.U2FAuthenticate],
    ["u2f_register", ClientAction.U2FRegister],
]);

EventsOn(
    "fido-approveClientAction",
    (actionString: string, relyingParty?: string, userName?: string) => {
        let action = actionStringToAction.get(actionString)!;
        console.assert(
            action != undefined,
            "Undefined client action: " + actionString
        );
        const onResponse = (approved: boolean) => {};
        showModal(
            <ApproveActionModal
                action={action}
                relyingParty={relyingParty}
                userName={userName}
                onResponse={onResponse}
            />
        );
    }
);
