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
                className: "h-5 w-5",
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
            <div className="rounded-t-lg bg-white shadow-top overflow-hidden py-2">
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

function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(" ");
}

export class NewTabBar extends React.Component<TabBarProps> {
    render() {
        const tabs = [];
        for (const tab of this.props.tabs) {
            const current = tab.id === this.props.activeTab;
            tabs.push(
                <a
                    key={tab.name}
                    className={classNames(
                        current
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                        "group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
                    )}
                    aria-current={current ? "page" : undefined}
                    onClick={() => this.props.onChangeTab(tab)}
                >
                    <tab.icon
                        className={classNames(
                            current
                                ? "text-indigo-500"
                                : "text-gray-400 group-hover:text-gray-500",
                            "-ml-0.5 mr-2 h-5 w-5"
                        )}
                        aria-hidden="true"
                    />
                    <span>{tab.name}</span>
                </a>
            );
        }
        return (
            <div className="w-full">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs}
                    </nav>
                </div>
            </div>
        );
    }
}
