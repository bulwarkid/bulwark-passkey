import React from "react";

let modalContainer: React.RefObject<ModalContainer> | null = null;

export function setModalContainer(
    newModalContainer: React.RefObject<ModalContainer>
) {
    modalContainer = newModalContainer;
}

export function showModal(modal: React.ReactElement) {
    modalContainer?.current?.showModal(modal);
}

export function hideModal() {
    modalContainer?.current?.cancelModal();
}

type ModalState = {
    activeModal: React.ReactElement | null;
    isModalActive: boolean;
};

export class ModalContainer extends React.Component<{}, ModalState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            activeModal: null,
            isModalActive: false,
        };
    }
    render() {
        let modalClassName =
            "w-screen h-screen absolute modal z-10 bg-gray-200";
        if (this.state.activeModal && this.state.isModalActive) {
            modalClassName += " modal-active";
        } else {
            modalClassName += " modal-inactive";
        }
        return <div className={modalClassName}>{this.state.activeModal}</div>;
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
