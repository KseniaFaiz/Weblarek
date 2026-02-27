import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';

interface IModal {
    content: HTMLElement;
    buttonClose: HTMLButtonElement;
}

export class Modal extends Component<IModal> {
    private modalContent: HTMLElement;
    private modalButtonClose: HTMLButtonElement;
    isOpen: boolean = false;

    constructor(container: HTMLElement, events: IEvents)  {
        super(container, events); 

        this.modalContent = ensureElement<HTMLElement>(
            '.modal__content',
            this.container
        );

        this.modalButtonClose = ensureElement<HTMLButtonElement>(
            '.modal__close',
            this.container
        );

        this.modalButtonClose.addEventListener('click', () => {
            this.close();
        });
    }

    protected handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' || event.key === 'Enter') {
            this.close();
        }
    };

    set content(elem: HTMLElement) {
        this.modalContent.replaceChildren(elem);
    }

    open(): void {
        this.container.classList.add('page__wrapper_locked');
        this.container.classList.add('modal_active');
        this.isOpen = true;

        document.addEventListener('keydown', this.handleKeyDown);

        this.events.emit('modal:open');
    }

    close(): void {
        if (!this.isOpen) {
            return;
        }

        this.container.classList.remove('page__wrapper_locked');
        this.container.classList.remove('modal_active');
        this.isOpen = false;

        document.removeEventListener('keydown', this.handleKeyDown);

        this.events.emit('modal:close');
    }
    };
