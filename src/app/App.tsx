import React from "react";
import { IdentityList } from "./IdentityList";
import { defaultTabs, TabBar } from "./TabBar";

export class App extends React.Component {
    render() {
        const identities = [];
        for (let i = 0; i < 50; i++) {
            identities.push({
                websiteName: "Website " + i,
                userName: "User " + i,
            });
        }
        return (
            <div className="w-screen h-screen flex flex-col">
                <IdentityList identities={identities} />
                <TabBar tabs={defaultTabs} />
            </div>
        );
    }
}
