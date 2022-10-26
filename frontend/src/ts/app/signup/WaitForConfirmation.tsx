import React from "react";
import { TitleBar } from "../../components/TitleBar";

export class WaitForConfirmationModal extends React.Component {
    render() {
        return (
            <div className="w-screen h-screen">
                <TitleBar title="Wait for Confirmation" />
                <div className="flex flex-col items-center justify-center">
                    Please check your email for confirmation
                </div>
            </div>
        );
    }
}
