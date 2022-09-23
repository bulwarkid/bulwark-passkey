import React from "react";
import { ListItem, ListSection } from "../../components/List";
import { app } from "../App";
import "../Modal.css";

export class PassphraseModal extends React.Component {
    render() {
        return (
            <div>
                <div className="h-12 flex justify-between items-center bg-slate-400 border-b border-slate-500 px-2">
                    <div onClick={this.onCancel_}>Cancel</div>
                    <div className="font-bold text-lg">Passphrase</div>
                    <div>Save</div>
                </div>
                <div className="mt-8">
                    <ListSection title="Settings">
                        <ListItem text="Current" />
                        <ListItem text="New" />
                    </ListSection>
                </div>
            </div>
        );
    }

    onCancel_ = () => {
        app.current?.cancelModal();
    };
}
