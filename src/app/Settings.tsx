import React from "react";
import { ListItem, ListSection } from "../components/List";
import { app, App } from "./App";
import { PassphraseModal } from "./modals/Passphrase";
import * as modal from "./ModalContainer";

export class Settings extends React.Component {
    render() {
        return (
            <div className="flex flex-col w-full py-8">
                <ListSection title="Settings">
                    <ListItem
                        text="Passphrase"
                        onClick={() => {
                            modal.showModal(<PassphraseModal />);
                        }}
                    />
                    <ListItem text="Vault File" />
                    <ListItem text="About" />
                </ListSection>
            </div>
        );
    }
}
