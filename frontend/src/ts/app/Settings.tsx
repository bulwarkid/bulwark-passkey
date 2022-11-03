import React from "react";
import { EditPassphraseModal } from "./modals/EditPassphrase";
import { TitleBar } from "../components/TitleBar";
import { FormDisplay, FormLink } from "../components/FormDisplay";
import { hideModal, showModal } from "./ModalStack";
import { EditEmailModal } from "./modals/EditEmail";
import {
    getEmail,
    isLoggedIn,
    updateAccountPassphrase,
    updateEmail,
} from "../data/supabase";
import {
    changePassphrase,
    getPassphrase,
    setPassphrase,
} from "../data/passphrase";
import { XIcon } from "../icons/x";
import { AboutModal } from "./modals/About";

export class Settings extends React.Component {
    render() {
        let settings = [];
        if (isLoggedIn()) {
            settings.push(
                <FormLink text="Account Email" onClick={this.updateEmail_} />
            );
            settings.push(
                <FormLink
                    text="Account Passphrase"
                    onClick={this.updatePassphrase_}
                />
            );
        } else {
            settings.push(
                <FormLink
                    text="Passphrase"
                    onClick={this.showUpdatePassphrase_}
                />
            );
        }
        settings.push(<FormLink text="About" onClick={this.showAbout_} />);
        return (
            <div className="w-full">
                <TitleBar title="Settings" />
                <div className="p-4">
                    <FormDisplay>{settings}</FormDisplay>
                </div>
            </div>
        );
    }

    showUpdatePassphrase_ = () => {
        const oldPassphrase = getPassphrase();
        showModal(
            <EditPassphraseModal
                oldPassphrase={oldPassphrase!}
                passphraseUpdated={(passphrase: string) => {
                    changePassphrase(passphrase);
                    hideModal();
                }}
                onCancel={() => {
                    hideModal();
                }}
            />
        );
    };

    showAbout_ = () => {
        showModal(
            <AboutModal
                onCancel={() => {
                    hideModal();
                }}
            />
        );
    };

    updateEmail_ = async () => {
        const email = await getEmail();
        if (email) {
            showModal(
                <EditEmailModal
                    currentEmail={email}
                    emailUpdated={async (newEmail: string) => {
                        if (await updateEmail(newEmail)) {
                            hideModal();
                        }
                    }}
                    onCancel={() => {
                        hideModal();
                    }}
                />
            );
        }
    };

    updatePassphrase_ = () => {
        const passphrase = getPassphrase();
        if (passphrase) {
            showModal(
                <EditPassphraseModal
                    oldPassphrase={passphrase}
                    passphraseUpdated={async (newPassphrase: string) => {
                        if (await updateAccountPassphrase(newPassphrase)) {
                            hideModal();
                        }
                    }}
                    onCancel={() => {
                        hideModal();
                    }}
                />
            );
        }
    };
}
