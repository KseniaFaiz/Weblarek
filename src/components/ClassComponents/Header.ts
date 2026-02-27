import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IHeader {
    counter: number;
}

export class Header extends Component<IHeader> {
    protected basketCounterElement: HTMLElement;
    protected basketButton: HTMLButtonElement;
    protected events: IEvents;


    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.events = events;
        this.basketCounterElement = ensureElement<HTMLElement>(
            '.header__basket-counter',
            this.container
        );

        this.basketButton = ensureElement<HTMLButtonElement>(
            '.header__basket',
            this.container
        );
        this.basketButton.addEventListener('click', () => {
            this.events.emit('basket:open');
        })
    }
    set counter(value: number) {
        this.basketCounterElement.textContent = String(value);
    }
}





