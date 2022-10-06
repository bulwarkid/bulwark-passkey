import React from "react";
import { TitleBar } from "../../components/TitleBar";

export enum ClientAction {
    U2FRegister = 1,
    U2FAuthenticate,
    FIDOMakeCredential,
    FIDOGetAssertion,
}

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
            return `Approve login to "${relyingParty}" with user "${userName}"?`;
        case ClientAction.FIDOMakeCredential:
            return `Approve account creation for "${relyingParty}"?`;
    }
}

type ApproveActionModalProps = {
    action: ClientAction;
    relyingParty?: string;
    userName?: string;
    onResponse: (approved: boolean) => void;
};

export class ApproveActionModal extends React.Component<ApproveActionModalProps> {
    render() {
        const { action, relyingParty, userName } = this.props;
        return (
            <div>
                <TitleBar title="Approve Action" />
                <div className="mt-8 px-4 w-full flex flex-col">
                    <div className="p-6 bg-gray-400 rounded-lg font-bold">
                        {prompt(action, relyingParty, userName)}
                    </div>
                    <div className="mt-4 flex">
                        <div
                            className="daisy-btn daisy-btn-success grow basis-0 mx-2"
                            onClick={() => {
                                this.props.onResponse(true);
                            }}
                        >
                            Approve
                        </div>
                        <div
                            className="daisy-btn daisy-btn-error grow basis-0 mx-2"
                            onClick={() => {
                                this.props.onResponse(false);
                            }}
                        >
                            Deny
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
