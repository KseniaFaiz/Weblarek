import { IBuyer, IBuyerValidationErrors } from '../../types';

export class BuyerModel implements IBuyer {
    payment: any;
    email: string;
    phone: string;
    address: string;


    constructor(initialData: Partial<IBuyer> = {}) {
        this.payment = initialData.payment;
        this.email = initialData.email || '';
        this.phone = initialData.phone || '';
        this.address = initialData.address || '';
    }

    saveData(initialData: Partial<IBuyer>): void {
        this.payment = initialData.payment;
        this.email = initialData.email || '';
        this.phone = initialData.phone || '';
        this.address = initialData.address || '';
    }

    getData(): IBuyer {
        return this;
    }

    clear(): void {
        Object.assign(this, {
            payment: '',
            email: '',
            phone: '',
            address: ''
        })

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