import React from "react";
import ReactDOM from "react-dom/client";
import { App, setAppRef } from "./app/App";
import "./app/backend-interface";

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

setTimeout(() => {
    // HACK: Sometimes, when immediately showing a modal, the entire windows
    // scrolls down. Set scroll back to the top 100ms after startup for this
    // occurance.
    window.scroll(0, 0);
}, 100);
