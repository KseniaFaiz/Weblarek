import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface ICardBasketElement {
  indexElement: HTMLElement;
}

export class CardBasket extends Component<ICardBasketElement> {
    protected indexElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.indexElement = ensureElement<HTMLElement>(
            '.basket__item-index',
            this.container
        );
    }

    set index(value: string) {
        this.indexElement.textContent = String(value);
    }
}