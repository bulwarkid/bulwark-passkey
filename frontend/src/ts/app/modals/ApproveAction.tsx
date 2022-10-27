import { promptUser } from "./Confirm";

export enum ClientAction {
    U2FRegister = 1,
    U2FAuthenticate,
    FIDOMakeCredential,
    FIDOGetAssertion,
}

const actionStringToAction = new Map([
    ["fido_get_assertion", ClientAction.FIDOGetAssertion],
    ["fido_make_credential", ClientAction.FIDOMakeCredential],
    ["u2f_authenticate", ClientAction.U2FAuthenticate],
    ["u2f_register", ClientAction.U2FRegister],
]);

function prompt(
    action: ClientAction,
    relyingParty?: string,
    userName?: string
): string {
    switch (action) {
        case ClientAction.U2FRegister:
            return "Approve registration of U2F device?";
        case ClientAction.U2FAuthenticate:
            return "Approve authentication with U2F device?";
        case ClientAction.FIDOGetAssertion:
            return `"${relyingParty}" would like to login with user "${userName}".`;
        case ClientAction.FIDOMakeCredential:
            return `"${relyingParty}" would like to create a new account.`;
    }
}

export async function approveClientAction(
    requestData: [string, string | undefined, string | undefined]
): Promise<boolean> {
    const [actionString, relyingParty, userName] = requestData;
    let action = actionStringToAction.get(actionString)!;
    console.assert(
        action !== undefined,
        "Undefined client action: " + actionString
    );
    return await promptUser(
        prompt(action, relyingParty, userName),
        "Approve Action"
    );
}
