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
            return `"${relyingParty}" would like to login with user "${userName}".`;
        case ClientAction.FIDOMakeCredential:
            return `"${relyingParty}" would like to create a new account.`;
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
            <div className="flex flex-col w-full h-full">
                <TitleBar title="Approve Action" />
                <div className="px-4 grow flex flex-col justify-center">
                    <div className="p-4 bg-gray-400 rounded-lg font-bold">
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
