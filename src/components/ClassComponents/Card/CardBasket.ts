import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { IEvents } from "../../base/Events";
import { IProduct } from "../../../types";

interface ICardBasketElement {
    indexElement: HTMLElement;
    buttonElement: HTMLButtonElement;
}

export class CardBasket extends Card<ICard> {
    protected indexElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);
        this.indexElement = ensureElement<HTMLElement>(
            '.basket__item-index',
            this.container
        );
        this.buttonElement = ensureElement<HTMLButtonElement>(
            '.basket__item-basket__item-delete',
            this.container
        );
        this.buttonElement.addEventListener('click', () => {
            this.events?.emit('card:remove-product', { id: this.id });
            this.events?.emit('cart:open');
        });
        // this.buttonElement.addEventListener('click', () => {
        //     this.events.emit('card:remove-product', { id: this.id });
        // })
    }

    set index(value: string) {
        this.indexElement.textContent = String(value);
    }
    render(data: IProduct) {
        this.id = data.id;
        return super.render(data);
    }

}