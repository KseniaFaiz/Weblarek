import { Payment } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Form } from "./Form";
import { IEvents } from "../../base/Events";

export interface IOrderData {
    payment: Payment;
    address: string;
};

export class FormOrder extends Form {
    protected payCard: HTMLButtonElement;
    protected payCash: HTMLButtonElement;
    protected addressInput: HTMLInputElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events, 'order:submit');

        this.payCard = ensureElement<HTMLButtonElement>(
            'button[name="card"]',
            this.container);
        this.payCash = ensureElement<HTMLButtonElement>(
            'button[name="cash"]',
            this.container);
        this.addressInput = ensureElement<HTMLInputElement>(
            'input[name="address"]',
            this.container);

        this.container.addEventListener('submit', (event: SubmitEvent) => {
            this.events.emit(this.submitEventName);
        });

        this.payCard.addEventListener('click', () => {
            this.payment = 'card';
            this.events.emit('buyer:change', { payment: 'card' });
        });

        this.payCash.addEventListener('click', () => {
            this.payment = 'cash';
            this.events.emit('buyer:change', { payment: 'cash' });
        });

        this.addressInput.addEventListener('change', () => {
            this.events.emit('buyer:change', { address: this.addressInput.value });
        });
    };

    selectPayment(payment: Payment): void {
        this.payCard.classList.toggle('button_alt-active', payment === 'card');
        this.payCash.classList.toggle('button_alt-active', payment === 'cash');
    }

    set payment(value: Payment) {
        this.selectPayment(value);
    }

    get payment(): Payment {
        return this.payCash.classList.contains('button_alt-active') ? 'cash' : 'card';
    }

    set address(value: string) {
        this.addressInput.value = value;
    };

    isAddressValid(errors?: { [key: string]: string }): void {
        this.checkErrors(errors || {});
    }
};

