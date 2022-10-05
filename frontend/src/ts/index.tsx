import React from "react";
import ReactDOM from "react-dom/client";
import { App, setAppRef } from "./app/App";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
const appRef = React.createRef<App>();
setAppRef(appRef);
root.render(
    <React.StrictMode>
        <App ref={appRef} />
    </React.StrictMode>
);
