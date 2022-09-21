import React from "react";
import { ListItem, ListSection } from "../components/List";

export class Settings extends React.Component {
    render() {
        return (
            <div className="flex flex-col w-full py-8">
                <ListSection title="Settings">
                    <ListItem text="Passphrase" />
                    <ListItem text="Vault File" />
                    <ListItem text="About" />
                </ListSection>
            </div>
        );
    }
}
