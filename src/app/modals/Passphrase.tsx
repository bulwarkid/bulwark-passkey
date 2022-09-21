import React from "react";
import { ListItem, ListSection } from "../../components/List";

export class PassphraseModal extends React.Component {
    render() {
        return (
            <div>
                <div className="h-12 flex justify-center items-center bg-slate-400 border-b border-slate-500 font-bold text-lg">
                    Passphrase
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
}
