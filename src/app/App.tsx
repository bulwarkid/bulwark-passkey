import React from "react";
import { LockIcon } from "../icons/lock";
import { SettingsIcon } from "../icons/settings";
import { IdentityList } from "./IdentityList";
import { Settings } from "./Settings";
import { TabBar } from "./TabBar";

export let app: React.RefObject<App>;

export function setAppRef(newApp: React.RefObject<App>) {
    app = newApp;
}

export type Tab = {
    id: TabID;
    name: string;
    icon: React.ComponentClass<{ color?: string }>;
};

export enum TabID {
    IDENTITIES = 1,
    SETTINGS,
}

const defaultTabs = [
    { id: TabID.IDENTITIES, name: "Identities", icon: LockIcon },
    { id: TabID.SETTINGS, name: "Settings", icon: SettingsIcon },
];

type AppState = {
    activeTab: TabID;
    isModalActive: boolean;
    activeModal: React.ReactElement | null;
};

export class App extends React.Component<{}, AppState> {
    private tabs_: Tab[];
    constructor(props: {}) {
        super(props);
        this.tabs_ = defaultTabs;
        this.state = {
            activeTab: this.tabs_[0].id,
            activeModal: null,
            isModalActive: false,
        };
    }
    render() {
        let modalClassName =
            "w-screen h-screen absolute top-0 modal z-10 bg-gray-200";
        if (this.state.activeModal && this.state.isModalActive) {
            modalClassName += " modal-active";
        } else {
            modalClassName += " modal-inactive";
        }
        let page;
        if (this.state.activeTab === TabID.SETTINGS) {
            page = <Settings />;
        } else if (this.state.activeTab === TabID.IDENTITIES) {
            const identities = [];
            for (let i = 0; i < 50; i++) {
                identities.push({
                    websiteName: "Website " + i,
                    userName: "User " + i,
                });
            }
            page = <IdentityList identities={identities} />;
        }
        return (
            <div className="relative">
                <div className="w-screen h-screen flex flex-col bg-gray-300">
                    <div className="grow overflow-y-scroll">{page}</div>
                    <div>
                        {
                            <TabBar
                                tabs={defaultTabs}
                                activeTab={this.state.activeTab}
                                onChangeTab={this.onChangeTab_}
                            />
                        }
                    </div>
                </div>
                <div className={modalClassName}>{this.state.activeModal}</div>
            </div>
        );
    }

    onChangeTab_ = (tab: Tab) => {
        this.setState({ activeTab: tab.id });
    };

    showModal = (modal: React.ReactElement) => {
        this.setState({ activeModal: modal, isModalActive: true });
    };
    cancelModal = () => {
        this.setState({ isModalActive: false }, () => {
            // Clear modal 1s later so the modal has time to transition out
            setTimeout(() => {
                if (!this.state.isModalActive) {
                    this.setState({ activeModal: null });
                }
            }, 1000);
        });
    };
}
