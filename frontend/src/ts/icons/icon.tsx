import React from "react";

export class Icon extends React.Component<{ color?: string }> {
    static defaultProps = {
        color: "currentColor",
    };
    render() {
        return <div />;
    }
}
