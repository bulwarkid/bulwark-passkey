import React from "react";
import { LockIcon } from "../icons/lock";
import { SettingsIcon } from "../icons/settings";
import { IdentityList } from "./IdentityList";
import { Settings } from "./Settings";
import { TabBar } from "./TabBar";

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
};

export class App extends React.Component<{}, AppState> {
    private tabs_: Tab[];
    constructor(props: {}) {
        super(props);
        this.tabs_ = defaultTabs;
        this.state = {
            activeTab: this.tabs_[0].id,
        };
    }
    render() {
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
        );
    }

    onChangeTab_ = (tab: Tab) => {
        this.setState({ activeTab: tab.id });
    };
}
