import React from "react";
import { EditPassphraseModal } from "./modals/Passphrase";
import { TitleBar } from "../components/TitleBar";
import { FormDisplay, FormLink } from "../components/FormDisplay";
import { hideModal, showModal } from "./ModalStack";
import { EditEmailModal } from "./modals/EditEmail";
import {
    getEmail,
    isLoggedIn,
    updateAccountPassphrase,
    updateEmail,
} from "../core/supabase";
import {
    changePassphrase,
    getPassphrase,
    setPassphrase,
} from "../data/passphrase";
import { XIcon } from "../icons/x";

class AccountSettings extends React.Component {
    render() {
        return (
            <div className="w-screen h-screen">
                <TitleBar
                    title="Account Settings"
                    leftButton={
                        <div
                            className="daisy-btn daisy-btn-ghost daisy-btn-square daisy-btn-sm m-2"
                            onClick={this.onCancel_}
                        >
                            <XIcon />
                        </div>
                    }
                />
                <div className="p-4">
                    <FormDisplay>
                        <FormLink text="Email" onClick={this.updateEmail_} />
                        <FormLink
                            text="Passphrase"
                            onClick={this.updatePassphrase_}
                        />
                    </FormDisplay>
                </div>
            </div>
        );
    }

    onCancel_ = () => {
        hideModal();
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
        settings.push(<FormLink text="About" onClick={() => {}} />);
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

    showAccountSettings_ = () => {
        showModal(<AccountSettings />);
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
