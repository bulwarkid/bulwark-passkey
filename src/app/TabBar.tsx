import React from "react";
import { Tab, TabID } from "./App";

const ACTIVE_TAB_COLOR = "#0000FF";
const INACTIVE_TAB_COLOR = "#000000";

type TabBarProps = {
    tabs: Tab[];
    activeTab: TabID;
    onChangeTab: (tab: Tab) => void;
};

export class TabBar extends React.Component<TabBarProps> {
    render() {
        const tabComponents = this.props.tabs.map((tab) => {
            const color =
                tab.id === this.props.activeTab
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
            <div className="bg-slate-400 border-t-2 border-slate-700 py-1">
                <div className="h-14 flex justify-evenly items-center">
                    {tabComponents}
                </div>
            </div>
        );
    }

    onClick = (tab: Tab) => {
        this.props.onChangeTab(tab);
    };
}
