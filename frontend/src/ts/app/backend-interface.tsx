import { registerHandler } from "../core/rpc";
import * as identities from "../data/identities";
import { approveClientAction } from "./modals/ApproveAction";
import { createNewVault } from "./signup/CreateAccount";
import { getPassphrase } from "../data/passphrase";
import { logIn } from "./signup/LogIn";

registerHandler("approveClientAction", approveClientAction);

registerHandler("update", identities.update);

registerHandler("logIn", logIn);

registerHandler("createNewVault", createNewVault);

registerHandler("getPassphrase", async () => {
    return getPassphrase() || "";
});
