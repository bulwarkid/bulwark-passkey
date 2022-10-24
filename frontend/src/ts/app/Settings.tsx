import React from "react";
import { showUpdatePassphrase } from "./modals/Passphrase";
import { TitleBar } from "../components/TitleBar";
import { FormDisplay, FormLink } from "../components/FormDisplay";

export class Settings extends React.Component {
    render() {
        return (
            <div className="w-full">
                <TitleBar title="Settings" />
                <div className="p-4">
                    <FormDisplay>
                        <FormLink
                            text="Passphrase"
                            onClick={showUpdatePassphrase}
                        />
                        <FormLink text="About" onClick={() => {}} />
                    </FormDisplay>
                </div>
            </div>
        );
    }
}
