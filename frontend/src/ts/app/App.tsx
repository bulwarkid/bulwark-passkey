import { Cog6ToothIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import React from "react";
import { IdentityList } from "./IdentityList";
import { ModalStack, setModalContainer } from "./ModalStack";
import { Popups, setPopups } from "./Popups";
import { Settings } from "./Settings";
import { TabBar } from "./TabBar";

export let app: React.RefObject<App>;

export function setAppRef(newApp: React.RefObject<App>) {
    app = newApp;
}

export type Tab = {
    id: TabID;
    name: string;
    icon: React.ComponentClass<any> | React.FunctionComponentFactory<any>;
};

export enum TabID {
    IDENTITIES = 1,
    SETTINGS,
}

const defaultTabs = [
    { id: TabID.IDENTITIES, name: "Identities", icon: LockClosedIcon },
    { id: TabID.SETTINGS, name: "Settings", icon: Cog6ToothIcon },
];

type AppState = {
    activeTab: TabID;
    isModalActive: boolean;
    activeModal: React.ReactElement | null;
};

export class App extends React.Component<{}, AppState> {
    private modalRef_ = React.createRef<ModalStack>();
    private popupsRef_ = React.createRef<Popups>();
    private tabs_: Tab[];
    constructor(props: {}) {
        super(props);
        this.tabs_ = defaultTabs;
        setModalContainer(this.modalRef_);
        setPopups(this.popupsRef_);
        this.state = {
            activeTab: this.tabs_[0].id,
            activeModal: null,
            isModalActive: false,
        };
    }

    render() {
        let page;
        if (this.state.activeTab === TabID.SETTINGS) {
            page = <Settings />;
        } else if (this.state.activeTab === TabID.IDENTITIES) {
            page = <IdentityList />;
        }
        return (
            <div className="w-screen h-screen">
                <div className="w-screen h-screen flex flex-col bg-gray-200">
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
                <ModalStack ref={this.modalRef_} />
                <Popups ref={this.popupsRef_} />
            </div>
        );
    }

    onChangeTab_ = (tab: Tab) => {
        this.setState({ activeTab: tab.id });
    };
}
