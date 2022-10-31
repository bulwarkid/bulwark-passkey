import { registerHandler } from "../core/rpc";
import * as identities from "../data/identities";
import { approveClientAction } from "./ApproveAction";
import { createNewVault } from "./signup/CreateAccount";
import { getPassphrase } from "../data/passphrase";
import { logInToExistingVault } from "./signup/LogIn";

registerHandler("approveClientAction", approveClientAction);

registerHandler("update", identities.update);

registerHandler("logIn", logInToExistingVault);

registerHandler("createNewVault", createNewVault);

registerHandler("getPassphrase", async () => {
    return getPassphrase() || "";
});

registerHandler("fetchRemoteVault", identities.fetchRemoteVault);

registerHandler("storeRemoteVault", identities.storeRemoteVault);
