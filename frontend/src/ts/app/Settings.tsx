import React from "react";
import { EditPassphraseModal } from "./modals/EditPassphrase";
import { hideModal, showModal } from "./ModalStack";
import { EditEmailModal } from "./modals/EditEmail";
import {
    getEmail,
    isLoggedIn,
    updateAccountPassphrase,
} from "../data/supabase";
import { changePassphrase, getPassphrase } from "../data/passphrase";
import { AboutModal } from "./modals/About";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

export class Settings extends React.Component {
    render() {
        let settings = [];
        if (isLoggedIn()) {
            settings.push(
                <SettingsItem
                    text="Account Email"
                    onClick={this.updateEmail_}
                />
            );
            settings.push(
                <SettingsItem
                    text="Account Passphrase"
                    onClick={this.updateAccountPassphrase_}
                />
            );
        } else {
            settings.push(
                <SettingsItem
                    text="Passphrase"
                    onClick={this.updateLocalPassphrase_}
                />
            );
        }
        settings.push(<SettingsItem text="About" onClick={this.showAbout_} />);
        return (
            <div className="w-full">
                <div className="p-4">
                    <div className="overflow-hidden bg-white shadow rounded-md">
                        <ul className="divide-y divide-gray-200">{settings}</ul>
                    </div>
                </div>
            </div>
        );
    }

    updateLocalPassphrase_ = () => {
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
                    emailUpdated={() => {
                        hideModal();
                    }}
                    onCancel={() => {
                        hideModal();
                    }}
                />
            );
        }
    };

    updateAccountPassphrase_ = () => {
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

type SettingsItemProps = {
    text: string;
    onClick: () => void;
};

class SettingsItem extends React.Component<SettingsItemProps> {
    render() {
        return (
            <li>
                <a
                    onClick={this.props.onClick}
                    className="block hover:bg-gray-50"
                >
                    <div className="flex items-center px-4 py-4">
                        <div className="min-w-0 flex-1">
                            <div className="truncate">
                                <div className="flex text-md">
                                    {this.props.text}
                                </div>
                            </div>
                        </div>
                        <div className="ml-5 flex-shrink-0">
                            <ChevronRightIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                </a>
            </li>
        );
    }
}
