import { IBasket } from "../../types";

export class Basket extends Component<IBasket> {
      basketasketList : HTMLElement;
  basketPrice : HTMLElement;
  basketButton : HTMLButtonElement;
}

this.basketasketList = ensureElement<HTMLElement>('.basket__list' , this.container);
this.basketPrice = ensureElement<HTMLElement>('.basket__price' , this.container);
this.basketButton = ensureElement<HTMLElement>('.basket__button' , this.container);

set basketList(items:HTMLElement[]) {

}

set basketPrice(value: number) {
this.counterElement.textContent = String(value);
}

set basketButton(items:HTMLButtonElement) {

}