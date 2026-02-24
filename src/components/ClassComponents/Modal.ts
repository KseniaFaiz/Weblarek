import { IModal } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export class Modal extends Component<IModal> {
    modalElement: HTMLElement;
    modalButton: HTMLButtonElement;
}

this.modalElement = ensureElement<HTMLElement>('.modal__content' , this.container);
this.modalButton = ensureElement<HTMLElement>('.modal__close' , this.container);

set modal (items:HTMLElement[]){
    this.counterElement[]
}