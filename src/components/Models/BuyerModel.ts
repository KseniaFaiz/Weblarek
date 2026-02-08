import { IBuyer, IBuyerValidationErrors } from '../../types';

export class BuyerModel {
    _data: IBuyer = {
        payment: 'online',
        email: '',
        phone: '',
        address: ''
    };

    constructor(initialData: Partial<IBuyer> = {}) {
        this._data = { ...this._data, ...initialData };
    }

    saveData(data: Partial<IBuyer>): void {
        this._data = { ...this._data, ...data };
    }

    getData(): IBuyer {
        return this._data;
    }

    clear(): void {
        this._data = {
            payment: 'online',
            email: '',
            phone: '',
            address: ''
        };
    }

    validate(): IBuyerValidationErrors {
        const errors: IBuyerValidationErrors = {};
        
        if (!this._data.payment) {
            errors.payment = 'Выберите оплаты';
        }
        
        if (!this._data.email) {
            errors.email = 'Укажите Email';
        }
        
        if (!this._data.phone) {
            errors.phone = 'Укажите номер телефона';
        }
        
        if (!this._data.address) {
            errors.address = 'Укажите адрес доставки';
        }
        
        return errors;
    }
}