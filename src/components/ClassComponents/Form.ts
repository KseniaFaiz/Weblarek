import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export interface IForm {
    formOrderButtonAlt: HTMLButtonElement;
    formOrderAddress: HTMLInputElement;
    formContactMail: HTMLInputElement;
    formContactPhone: HTMLInputElement;
    formSubmit: HTMLButtonElement;

}

export class Form extends Component<IForm> {
    formOrderButtonAlt: HTMLButtonElement;
    formOrderAddress: HTMLInputElement;
    formContactMail: HTMLInputElement;
    formContactPhone: HTMLInputElement;
    formSubmit: HTMLButtonElement;

    constructor(container: HTMLElement) {
        super(container);
        this.formOrderButtonAlt = ensureElement<HTMLButtonElement>(
            '.button_alt',
            this.container
        );

        this.formOrderAddress = ensureElement<HTMLInputElement>(
            'input[name="address"]',
            this.container
        );

        this.formContactMail = ensureElement<HTMLInputElement>(
            'input[name="email"]',
            this.container
        );

        this.formContactPhone = ensureElement<HTMLInputElement>(
            'input[name="phone"]',
            this.container
        );

        this.formSubmit = ensureElement<HTMLButtonElement>(
            '.modal__actions button[type="submit"]',
            this.container
        );
    }

    enableSubmit() {
        if (this.formOrderAddress.value && this.formContactMail.value && this.formContactPhone.value) {
            this.formSubmit.disabled = false;
        } else {
            this.formSubmit.disabled = true;
        }
    }

    setupEventListeners() {
        this.formOrderButtonAlt.addEventListener('click', () => {
            // Handle payment method selection logic
            console.log("Payment method selected.");
        });

        [this.formOrderAddress, this.formContactMail, this.formContactPhone].forEach(input => {
            input.addEventListener('input', () => this.enableSubmit());
        });
    }

    // Call setupEventListeners at the end of the constructor
    init() {
        this.setupEventListeners();
    }
}