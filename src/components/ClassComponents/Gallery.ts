import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IGallery {
    catalog: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
    galleryElement: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.galleryElement = ensureElement<HTMLElement>('.gallery', this.container);
    }

    // Method to set the catalog items in the gallery
    set catalog(items: HTMLElement[]) {
        this.galleryElement.innerHTML = ''; // Clear existing items
        items.forEach(item => {
            this.galleryElement.appendChild(item); // Append new items to the gallery
        });
    }
}


