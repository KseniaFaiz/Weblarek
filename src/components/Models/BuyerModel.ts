import { IBuyer, IBuyerValidationErrors, Payment } from '../../types';

export class BuyerModel {
    private payment: Payment = '';
    private email: string = '';
    private phone: string = ''
    private address: string = '';

    constructor() {
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
        this.payment = '';
        this.email = '';
        this.phone = '';
        this.address = '';
    }

    validate(): IBuyerValidationErrors {
        const errors: IBuyerValidationErrors = {};

        if (!this.payment) {
            errors.payment = 'Выберите оплаты';
        }

        if (!this.email) {
            errors.email = 'Укажите Email';
        }

        if (!this.phone) {
            errors.phone = 'Укажите номер телефона';
        }

        if (!this.address) {
            errors.address = 'Укажите адрес доставки';
        }

        return errors;
    }
}