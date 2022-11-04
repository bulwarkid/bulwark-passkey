import React from "react";

let popups_: React.RefObject<Popups> | undefined = undefined;

export function setPopups(popups: React.RefObject<Popups>) {
    popups_ = popups;
}

export function showPopup(
    createPopup: (hide: () => void) => React.ReactElement
): number {
    return popups_!.current!.addPopup(createPopup);
}

export class Popups extends React.Component {
    private popups_ = new Map<number, React.ReactElement>();
    private popupIndex_ = 0;

    render() {
        return <div className="z-50">{this.popups_.entries()}</div>;
    }
    addPopup(createPopup: (hide: () => void) => React.ReactElement) {
        const index = this.popupIndex_++;
        const popup = createPopup(() => {
            this.removePopup(index);
        });
        this.popups_.set(index, popup);
        this.forceUpdate();
        return index;
    }
    removePopup(index: number) {
        this.popups_.delete(index);
        this.forceUpdate();
    }
}
