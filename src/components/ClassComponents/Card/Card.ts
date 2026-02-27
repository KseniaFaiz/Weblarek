import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

export interface ICard {
    title: string;
    price: number;
    id?: string;
}

export class Card<T extends ICard> extends Component<T> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;
    protected id?: string;

    constructor(container: HTMLElement) {
        super(container);
        this.titleElement = ensureElement<HTMLElement>(
            '.card__title',
            this.container
        );

        this.priceElement = ensureElement<HTMLButtonElement>(
            '.card__price',
            this.container
        );
    }

    set title(value: string) {
        this.titleElement.textContent = String(value);
    }
    set price(value: number | null) {
        const textContent = value ? `${value} синапсов` : 'Бесценно';
        this.priceElement.textContent = textContent;
    }

}






