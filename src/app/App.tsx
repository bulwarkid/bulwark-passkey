import React from "react";
import "./App.css";
import { List } from "./List";

function App() {
    const identities = [];
    for (let i = 0; i < 50; i++) {
        identities.push({ websiteName: "Website " + i, userName: "User " + i });
    }
    return (
        <div className="App w-screen h-screen">
            <List identities={identities} />
        </div>
    );
}

export default App;
