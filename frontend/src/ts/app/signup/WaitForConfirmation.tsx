import React from "react";
import { TitleBar, TitleBarButton } from "../../components/TitleBar";

type WaitForConfirmationModalProps = {
    onCancel: () => void;
};

export class WaitForConfirmationModal extends React.Component<WaitForConfirmationModalProps> {
    render() {
        return (
            <div className="w-screen h-screen flex flex-col">
                <TitleBar
                    title="Wait for Confirmation"
                    leftButton={
                        <TitleBarButton
                            onClick={this.props.onCancel}
                            text="Cancel"
                        />
                    }
                />
                <div className="grow flex flex-col items-center justify-center text-lg font-bold p-4">
                    Please check your email for confirmation
                </div>
            </div>
        );
    }
}
