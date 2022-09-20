import React from "react";
import { LockIcon } from "../icons/lock";
import { SettingsIcon } from "../icons/settings";

const ACTIVE_TAB_COLOR = "#0000FF";
const INACTIVE_TAB_COLOR = "#000000";

export const defaultTabs = [
    { name: "Identities", icon: LockIcon },
    { name: "Settings", icon: SettingsIcon },
];

export type Tab = {
    name: string;
    icon: React.ComponentClass<{ color?: string }>;
};

type TabBarProps = {
    tabs: Tab[];
};

type TabBarState = {
    activeTab: string;
};

export class TabBar extends React.Component<TabBarProps, TabBarState> {
    constructor(props: TabBarProps) {
        super(props);
        this.state = {
            activeTab: props.tabs.length > 0 ? props.tabs[0].name : "",
        };
    }

    render() {
        const tabComponents = this.props.tabs.map((tab) => {
            const color =
                tab.name == this.state.activeTab
                    ? ACTIVE_TAB_COLOR
                    : INACTIVE_TAB_COLOR;
            const icon = React.createElement(tab.icon, {
                color: color,
            });
            return (
                <div
                    className="flex flex-col items-center"
                    onClick={() => {
                        this.onClick(tab);
                    }}
                >
                    {icon}
                    <div style={{ color: color }}>{tab.name}</div>
                </div>
            );
        });
        return (
            <div className="w-full bg-slate-400 grow">
                <div className="h-0.5 bg-slate-700"></div>
                <div className="h-14 my-1 flex justify-evenly items-center">
                    {tabComponents}
                </div>
            </div>
        );
    }

    onClick = (tab: Tab) => {
        this.setState({ activeTab: tab.name });
    };
}
