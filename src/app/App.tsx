import React from "react";
import { List } from "./List";

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
            <div className="text-center w-screen h-screen">
                <List identities={identities} />
            </div>
        );
    }
}
