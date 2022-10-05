import React from "react";

type FormItemProps = {
    left?: string;
    right?: string;
};

export class FormItem extends React.Component<FormItemProps> {
    render() {
        return (
            <div className="p-3 flex justify-between items-center">
                <div>{this.props.left}</div>
                <div className="text-gray-600">{this.props.right}</div>
            </div>
        );
    }
}

export class FormDisplay extends React.Component<{
    children: React.ReactElement[];
}> {
    render() {
        const items = [];
        for (const child of this.props.children) {
            items.push(child);
            items.push(<div className="border-b border-gray-400" />);
        }
        items.pop();
        return (
            <div className="rounded-lg bg-gray-300 flex flex-col">{items}</div>
        );
    }
}
