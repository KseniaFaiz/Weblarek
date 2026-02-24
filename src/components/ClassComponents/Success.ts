import { ISuccess } from "../../types";
import { ensureElement } from "../../utils/utils";

export class Success extends Component<ISuccess> {
successElement:HTMLElement;
successButton:HTMLButtonElement;
}

this.successElement = ensureElement<HTMLElement>('.order-success' , this.container);
this.successButton = ensureElement<HTMLElement>('.order-success__close' , this.container);


set success(value: number) {
    this.counterElement.textContent = Number(value);
}