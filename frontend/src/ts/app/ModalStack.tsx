import React from "react";
import { LogDebug } from "../wailsjs/runtime/runtime";

let modalStack: React.RefObject<ModalStack> | null = null;

export function setModalContainer(newModalStack: React.RefObject<ModalStack>) {
    modalStack = newModalStack;
}

export function showModal(modal: React.ReactElement) {
    modalStack?.current?.showModal(modal);
}

export function hideModal() {
    modalStack?.current?.hideModal();
}

type ModalState = {
    activeModal: React.ReactElement | null;
    isModalActive: boolean;
};

export class ModalStack extends React.Component {
    private NUM_MAX_MODALS = 5;
    private modals_: React.ReactElement[] = [];
    private modalRefs_: React.RefObject<ModalContainer>[];

    constructor(props: {}) {
        super(props);
        this.modalRefs_ = [];
        for (let i = 0; i < this.NUM_MAX_MODALS; i++) {
            this.modalRefs_.push(React.createRef<ModalContainer>());
        }
        this.state = {
            modals: [],
        };
    }

    render() {
        const modals = [];
        for (let i = 0; i < this.NUM_MAX_MODALS; i++) {
            modals.push(
                <ModalContainer ref={this.modalRefs_[i]} zIndex={i * 10 + 10} />
            );
        }
        return <div>{modals}</div>;
    }

    showModal = (modal: React.ReactElement) => {
        if (this.modals_.length >= this.NUM_MAX_MODALS) {
            LogDebug("Reached max modal count!");
            return;
        }
        this.modals_.push(modal);
        this.modalRefs_[this.modals_.length - 1].current?.showModal(modal);
    };

    hideModal = () => {
        if (this.modals_.length === 0) {
            LogDebug("Trying to hide modal when there is none!");
            return;
        }
        this.modalRefs_[this.modals_.length - 1].current?.cancelModal();
        this.modals_.pop();
    };
}

type ModalContainerProps = {
    zIndex: number;
};

class ModalContainer extends React.Component<ModalContainerProps, ModalState> {
    constructor(props: ModalContainerProps) {
        super(props);
        this.state = {
            activeModal: null,
            isModalActive: false,
        };
    }

    render() {
        const style = {
            zIndex: this.props.zIndex,
        };
        let backdrop;
        let modalClassName =
            "w-screen h-screen absolute modal pointer-events-auto";
        if (this.state.activeModal && this.state.isModalActive) {
            modalClassName += " modal-active";
            backdrop = (
                <div
                    className="w-screen h-screen absolute top-0 bg-gray-500 bg-opacity-75"
                    style={{ zIndex: this.props.zIndex - 1 }}
                />
            );
        } else {
            modalClassName += " modal-inactive";
        }
        return (
            <div>
                {backdrop}
                <div style={style} className={modalClassName}>
                    {this.state.activeModal}
                </div>
            </div>
        );
    }

    showModal = (modal: React.ReactElement) => {
        this.setState({ activeModal: modal, isModalActive: true });
    };
    cancelModal = () => {
        this.setState({ isModalActive: false }, () => {
            // Clear modal 1s later so the modal has time to transition out
            setTimeout(() => {
                if (!this.state.isModalActive) {
                    this.setState({ activeModal: null });
                }
            }, 1000);
        });
    };
}
