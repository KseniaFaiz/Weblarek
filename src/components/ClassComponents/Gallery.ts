import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";


interface IGallery {
    catalog: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
    galleryElement: HTMLElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.galleryElement = ensureElement<HTMLElement>('.gallery', this.container);

    }
    set catalog(items: HTMLElement[]) {
        this.galleryElement[]
    }
}