import React from "react";
import { ListItem, ListSection } from "../../components/List";
import { app } from "../App";
import "../Modal.css";

export class PassphraseModal extends React.Component {
    render() {
        return (
            <div>
                <div className="h-12 flex justify-between items-center bg-slate-400 border-b border-slate-500 px-2">
                    <div
                        className="daisy-btn daisy-btn-sm daisy-btn-ghost"
                        onClick={this.onCancel_}
                    >
                        Cancel
                    </div>
                    <div className="font-bold text-lg">Passphrase</div>
                    <div className="daisy-btn daisy-btn-sm daisy-btn-ghost">
                        Save
                    </div>
                </div>
                <div className="mt-8 w-full px-4 flex flex-col">
                    <div className="daisy-form-control">
                        <label className="daisy-label">
                            <span className="daisy-label-text">
                                Current Passphrase
                            </span>
                        </label>
                        <div className="daisy-input-group">
                            <input
                                type="text"
                                className="daisy-input daisy-input-bordered daisy-input-md w-full"
                                disabled
                            ></input>
                            <div className="daisy-btn">Show</div>
                        </div>
                    </div>
                    <div className="daisy-form-control">
                        <label className="daisy-label">
                            <span className="daisy-label-text">
                                New Passphrase
                            </span>
                        </label>
                        <div className="daisy-input-group daisy-input-group-vertical">
                            <input
                                type="text"
                                placeholder="New Passphrase"
                                className="daisy-input daisy-input-bordered daisy-input-md"
                            ></input>
                            <input
                                type="text"
                                placeholder="Confirm Passphrase"
                                className="daisy-input daisy-input-bordered daisy-input-md"
                            ></input>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onCancel_ = () => {
        app.current?.cancelModal();
    };
}
