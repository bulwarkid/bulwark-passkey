import React from "react";

export class Center extends React.Component<{ children: React.ReactNode }> {
    render() {
        return (
            <div className="form justify-center items-center">
                {this.props.children}
            </div>
        );
    }
}
