import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface ISuccess {
    successElement: HTMLElement;
    successButtonClose: HTMLButtonElement;
    successDescription: HTMLElement;
}

export interface ISuccessActions {
    onOrdered?: () => void;
}

export class Success extends Component<ISuccess> {
    successElement: HTMLElement;
    successButtonClose: HTMLButtonElement;
    successDescription: HTMLElement;

   constructor(container: HTMLElement, events: IEvents, actions?: ISuccessActions) {
        super(container, events);
        this.successElement = ensureElement<HTMLElement>(
            '.order-success',
            this.container
        );

        this.successButtonClose = ensureElement<HTMLButtonElement>(
            '.order-success__close',
            this.container
        );
        this.successDescription = ensureElement<HTMLElement>(
            '.order-order-success__description',
            this.container
        );
        if (actions?.onOrdered) {
            this.successButtonClose.addEventListener('click', actions.onOrdered);
        }
    }

}