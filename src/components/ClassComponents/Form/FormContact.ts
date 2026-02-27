import { ensureElement } from '../../../utils/utils';
import { Form } from './Form';
import { IEvents } from '../../base/Events';


export class FormContacts extends Form {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events, 'contacts:submit');

    this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
    this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);

    this.emailInput.addEventListener('change', () => {
      this.events.emit('buyer:change-contacts', { email: this.emailInput.value });
    });

    this.phoneInput.addEventListener('change', () => {
      this.events.emit('buyer:change-contacts', { phone: this.phoneInput.value });
    });
  };

  set email(value: string) {
    this.emailInput.value = value;
  }

  set phone(value: string) {
    this.phoneInput.value = value;
  }

  isContactsValid(errors?: { [key: string]: string }): void {
    this.checkErrors(errors || {});
  }
};