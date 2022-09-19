import React from "react";
import { LockIcon } from "../icons/lock";
import { SettingsIcon } from "../icons/settings";

export class TabBar extends React.Component {
    render() {
        return (
            <div className="w-full bg-slate-400 grow">
                <div className="h-0.5 bg-slate-700"></div>
                <div className="h-14 my-1 flex justify-evenly items-center">
                    <div className="flex flex-col items-center">
                        <LockIcon />
                        <div>Identities</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <SettingsIcon />
                        <div>Settings</div>
                    </div>
                </div>
            </div>
        );
    }
}
