import { Component } from '../../base/Component';
import { ensureElement } from '../../../utils/utils';
import { IEvents } from '../../base/Events';


// export interface IForm {
//     formOrderButtonAlt: HTMLButtonElement;
//     formOrderAddress: HTMLInputElement;
//     formContactMail: HTMLInputElement;
//     formContactPhone: HTMLInputElement;
//     formSubmit: HTMLButtonElement;

// }
export abstract class Form extends Component<{}> {
    protected errorForm: HTMLElement;
    protected submitButton: HTMLButtonElement;

    constructor(
        container: HTMLElement,
        protected events: IEvents,
        protected submitEventName: string
    ) {
        super(container, events);

        this.errorForm = ensureElement<HTMLElement>('.form__errors', this.container);
        this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);

        this.container.addEventListener('submit', (event: SubmitEvent) => {
            event.preventDefault();
            this.events.emit(this.submitEventName);
        });
    };

    set errors(value: string) {
        this.errorForm.textContent = String(value);
    };

    set submitButtonDisabled(value: boolean) {
        this.submitButton.disabled = value;
    }

    removeErrors() {
        this.errorForm.textContent = '';
    }

    checkErrors(errors: { [key: string]: string }): void {
        const errorsList = Object.values(errors).filter(Boolean);
        if (errorsList.length > 0) {
            this.errors = errorsList.join(', ');
            this.submitButton.disabled = true;
        } else {
            this.removeErrors();
            this.submitButton.disabled = false;
        }
    }
};




// export class Form extends Component<IForm> {
//     formOrderButtonAlt: HTMLButtonElement;
//     formOrderAddress: HTMLInputElement;
//     formContactMail: HTMLInputElement;
//     formContactPhone: HTMLInputElement;
//     formSubmit: HTMLButtonElement;

//     constructor(container: HTMLElement) {
//         super(container);
//         this.formOrderButtonAlt = ensureElement<HTMLButtonElement>(
//             '.button_alt',
//             this.container
//         );

//         this.formOrderAddress = ensureElement<HTMLInputElement>(
//             'input[name="address"]',
//             this.container
//         );

//         this.formContactMail = ensureElement<HTMLInputElement>(
//             'input[name="email"]',
//             this.container
//         );

//         this.formContactPhone = ensureElement<HTMLInputElement>(
//             'input[name="phone"]',
//             this.container
//         );

//         this.formSubmit = ensureElement<HTMLButtonElement>(
//             '.modal__actions button[type="submit"]',
//             this.container
//         );
//     }

//     enableSubmit() {
//         if (this.formOrderAddress.value && this.formContactMail.value && this.formContactPhone.value) {
//             this.formSubmit.disabled = false;
//         } else {
//             this.formSubmit.disabled = true;
//         }
//     }

//     setupEventListeners() {
//         this.formOrderButtonAlt.addEventListener('click', () => {
//             // Handle payment method selection logic
//             console.log("Payment method selected.");
//         });

//         [this.formOrderAddress, this.formContactMail, this.formContactPhone].forEach(input => {
//             input.addEventListener('input', () => this.enableSubmit());
//         });
//     }

//     // Call setupEventListeners at the end of the constructor
//     init() {
//         this.setupEventListeners();
//     }
// }