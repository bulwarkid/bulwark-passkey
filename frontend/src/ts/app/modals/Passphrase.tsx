import React from "react";
import { TitleBar, TitleBarButton } from "../../components/TitleBar";
import * as modal from "../ModalContainer";

export class PassphraseModal extends React.Component {
    render() {
        return (
            <div>
                <TitleBar
                    title="Passphrase"
                    leftButton={
                        <TitleBarButton
                            text="Cancel"
                            onClick={this.onCancel_}
                        />
                    }
                    rightButton={<TitleBarButton text="Save" />}
                />
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
        modal.hideModal();
    };
}
