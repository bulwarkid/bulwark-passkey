import React from "react";
import { ListItem, ListSection } from "../components/List";
import { showUpdatePassphrase } from "./modals/Passphrase";
import { TitleBar } from "../components/TitleBar";

export class Settings extends React.Component {
    render() {
        return (
            <div className="w-full">
                <TitleBar title="Settings" />
                <div className="p-4">
                    <ListSection>
                        <ListItem
                            text="Passphrase"
                            onClick={showUpdatePassphrase}
                        />
                        <ListItem text="Vault File" />
                        <ListItem text="About" />
                    </ListSection>
                </div>
            </div>
        );
    }
}
