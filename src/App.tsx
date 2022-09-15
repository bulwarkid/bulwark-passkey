import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { List } from "./List";

function App() {
    const identities = [];
    for (let i = 0; i < 10; i++) {
        identities.push({ websiteName: "Website " + i, userName: "User " + i });
    }
    return (
        <div className="App">
            <List identities={identities} />
        </div>
    );
}

export default App;
