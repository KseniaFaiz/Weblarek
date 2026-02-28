import { Component } from '../../base/Component';
import { ensureElement } from '../../../utils/utils';
import { IEvents } from '../../base/Events';


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
