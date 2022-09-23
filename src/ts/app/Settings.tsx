import React from "react";
import { ListItem, ListSection } from "../components/List";
import { PassphraseModal } from "./modals/Passphrase";
import * as modal from "./ModalContainer";
import { TitleBar } from "../components/TitleBar";

export class Settings extends React.Component {
    render() {
        return (
            <div className="w-full pt-4">
                <div className="flex justify-center">
                    <span className="text-xl font-bold">Settings</span>
                </div>
                <div className="pt-4">
                    <ListSection>
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
            </div>
        );
    }
}
