import { Switch } from "@headlessui/react";
import React from "react";
import { Button, ButtonColor, ButtonSize } from "../../components/Buttons";
import { CardModal, CardModalTitle } from "../../components/Modal";
import * as util from "../../core/util";
import { promptUser } from "./Confirm";

type DeveloperModalProps = {
    onCancel: () => void;
};

export class DeveloperModal extends React.Component<DeveloperModalProps> {
    render() {
        const logsEnabled = util.isDebugLogsEnabled();
        const title = (
            <CardModalTitle
                title="Developer"
                button={
                    <Button
                        text="Close"
                        onClick={this.props.onCancel}
                        color={ButtonColor.CLEAR}
                        size={ButtonSize.SM}
                    />
                }
            />
        );
        const content = (
            <div className="grow flex flex-col justify-center p-4">
                <Switch.Group
                    as="div"
                    className="flex items-center justify-between"
                >
                    <Switch.Label
                        as="span"
                        className="text-md text-gray-700"
                        passive
                    >
                        Enable Debug Logs
                    </Switch.Label>
                    <Switch
                        checked={logsEnabled}
                        onChange={this.toggleLogs_}
                        className={util.classNames(
                            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                            {
                                "bg-indigo-600": logsEnabled,
                                "bg-gray-200": !logsEnabled,
                            }
                        )}
                    >
                        <span
                            aria-hidden="true"
                            className={util.classNames(
                                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                                {
                                    "translate-x-5": logsEnabled,
                                    "translate-x-0": !logsEnabled,
                                }
                            )}
                        />
                    </Switch>
                </Switch.Group>
            </div>
        );
        return (
            <CardModal>
                {title}
                {content}
            </CardModal>
        );
    }

    toggleLogs_ = () => {
        promptUser(
            "Warning: enabling debug logs will potentially record personal information " +
                "like usernames and websites to the local unencrypted log file. Your login " +
                "credentials will not be recorded. It is recommended that you only enable debug " +
                "logs with a test account. Do you want to enable debug logs?",
            "Enable Debug Logs"
        ).then((confirmed) => {
            if (confirmed) {
                util.toggleDebugLogs();
                this.forceUpdate();
            }
        });
    };
}
