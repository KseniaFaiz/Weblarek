import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export interface ISuccess {
    successElement: HTMLElement;
    successButtonClose: HTMLButtonElement;
    successDescription: HTMLElement;
}


export class Success extends Component<ISuccess> {
    successElement: HTMLElement;
    successButtonClose: HTMLButtonElement;
    successDescription: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.successElement = ensureElement<HTMLElement>(
            '.order-success',
            this.container
        );

        this.successButtonClose = ensureElement<HTMLButtonElement>(
            '.order-success__close',
            this.container
        );
        this.successDescription = ensureElement<HTMLElement>(
            '.order-order-success__description',
            this.container
        );
    }


    // Method to set the success message description
    set successDescriptionText(value: number) {
        this.successDescription.textContent = `Списано ${value} синапсов`; // Sets the description text with the amount
    }

    // Method to configure the close button behavior
    initializeCloseButton(handler: () => void) {
        this.successButtonClose.addEventListener('click', handler); // Attach event handler for button click
    }

    // Optional: Method to display the success message
    show() {
        this.successElement.style.display = 'block'; // Make the success element visible
    }

    // Optional: Method to hide the success message
    hide() {
        this.successElement.style.display = 'none'; // Hide the success element
    }
}