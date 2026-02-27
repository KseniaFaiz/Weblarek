import { IBuyer, Payment } from '../../types';
import { IEvents } from "../base/Events";
export class BuyerModel {
    private payment: Payment | null = null;
    private email: string = '';
    private phone: string = ''
    private address: string = '';

    constructor(protected events: IEvents) {
    }

    saveData(data: Partial<IBuyer>): void {
        if (data.payment !== undefined) {
            this.payment = data.payment;
        }
        if (data.email !== undefined) {
            this.email = data.email;
        }
        if (data.phone !== undefined) {
            this.phone = data.phone;
        }
        if (data.address !== undefined) {
            this.address = data.address;
        }
        this.events.emit('buyer:changed', this.getData());
    }

    getData(): IBuyer {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address,
        };
    }
    clear(): void {
        this.payment = null;
        this.email = '';
        this.phone = '';
        this.address = '';
        this.events.emit('buyer:cleared');
    }

    validate(): { [key: string]: string } {
        const errors: { address?: string, payment?: string, email?: string, phone?: string } = {}

        if (!this.payment) {
            errors.payment = 'Выберите способ оплаты';
        } else if (!this.address || this.address.trim() === '') {
            errors.address = 'Необходимо указать адрес';
        }

        return errors;

    }

    validateContacts(): { [key: string]: string } {
        const errors: { address?: string, payment?: string, email?: string, phone?: string } = {}
        if (!this.email) {
            errors.email = 'Укажите Email';
        } else if (!this.phone) {
            errors.phone = 'Укажите номер телефона';
        }

        return errors;

    }
}