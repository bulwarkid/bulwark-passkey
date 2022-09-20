import React from "react";

export class Settings extends React.Component {
    render() {
        return (
            <div className="flex flex-col w-full">
                <div className="pl-4 text-lg">Settings</div>
                <div className="h-12 bg-slate-400">Passphrase</div>
                <div className="h-12 bg-slate-400">Vault File</div>
                <div className="h-12 bg-slate-400">About</div>
            </div>
        );
    }
}
