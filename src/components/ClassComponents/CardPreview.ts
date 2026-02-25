import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface ICardPreview {
    image: HTMLElement;
    price: number;
}

export class CardPreview  extends Component<ICardPreview> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;

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
    set price(value: number) {
        this.priceElement.textContent = String(value);
    }
}





