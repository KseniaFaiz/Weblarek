import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";


export interface IModal {
    modalElement: HTMLElement;
    modalButtonClose: HTMLButtonElement;
}

export class Modal extends Component<IModal> {
    modalElement: HTMLElement;
    modalButtonClose: HTMLButtonElement;

    constructor(container: HTMLElement) {
        super(container);
        this.modalElement = ensureElement<HTMLElement>(
            '.modal',
            this.container
        );

        this.modalButtonClose = ensureElement<HTMLButtonElement>(
            '.modal__close',
            this.container
        );
    }


    // Method to set content inside the modal
    set modalContent(items: HTMLElement[]) {
        const contentContainer = ensureElement<HTMLElement>('.modal__content', this.modalElement);
        contentContainer.innerHTML = ''; // Clear existing content
        items.forEach(item => {
            contentContainer.appendChild(item); // Append new items
        });
    }

    // Method to show the modal
    show() {
        this.modalElement.style.display = 'block'; // Display the modal
    }

    // Method to hide the modal
    hide() {
        this.modalElement.style.display = 'none'; // Hide the modal
    }

    // Method to initialize the close button functionality
    initializeCloseButton(handler: () => void) {
        this.modalButtonClose.addEventListener('click', handler); // Attach event handler
    }
}